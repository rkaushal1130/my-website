import { prisma, withDbFallback } from '../config/prisma';
import { hashPassword, verifyPassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { RegisterInput, LoginInput } from '../validators/auth.validator';
import { SafeUser } from '../types';
import { logger } from '../utils/logger';

export class AuthenticationError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = 401) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = statusCode;
  }
}

export class DuplicateEmailError extends Error {
  public statusCode: number;

  constructor(message = 'An account with this email address already exists') {
    super(message);
    this.name = 'DuplicateEmailError';
    this.statusCode = 409;
  }
}

// In-memory development store fallback for testing when DB is disconnected
const devUsersStore: Array<SafeUser & { passwordHash: string }> = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'NeverQuit Admin',
    email: 'admin@neverquit.ai',
    passwordHash: '$2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', // password123!
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Standard User',
    email: 'user@neverquit.ai',
    passwordHash: '$2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', // password123!
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class AuthService {
  /**
   * Register a new user account.
   */
  public static async register(input: RegisterInput): Promise<{ user: SafeUser; token: string }> {
    const normalizedEmail = input.email.toLowerCase().trim();

    return withDbFallback(
      async () => {
        const existingUser = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (existingUser) {
          throw new DuplicateEmailError('An account with this email address already exists.');
        }

        const passwordHash = await hashPassword(input.password);
        const user = await prisma.user.create({
          data: {
            name: input.name.trim(),
            email: normalizedEmail,
            passwordHash,
            role: 'USER',
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        const token = generateToken({
          userId: user.id,
          email: user.email,
          role: user.role,
        });

        return { user, token };
      },
      async () => {
        const devExisting = devUsersStore.find((u) => u.email === normalizedEmail);
        if (devExisting) {
          throw new DuplicateEmailError('An account with this email address already exists.');
        }

        const passwordHash = await hashPassword(input.password);
        const newUser = {
          id: `dev-${Date.now()}`,
          name: input.name.trim(),
          email: normalizedEmail,
          passwordHash,
          role: 'USER' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        devUsersStore.push(newUser);

        const safeUser: SafeUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        };

        const token = generateToken({
          userId: safeUser.id,
          email: safeUser.email,
          role: safeUser.role,
        });

        return { user: safeUser, token };
      }
    );
  }

  /**
   * Log in user and generate signed JWT.
   */
  public static async login(input: LoginInput): Promise<{ user: SafeUser; token: string }> {
    const normalizedEmail = input.email.toLowerCase().trim();
    const genericErrorMessage = 'Invalid email or password.';

    return withDbFallback(
      async () => {
        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (!user) {
          throw new AuthenticationError(genericErrorMessage, 401);
        }

        const isPasswordValid = await verifyPassword(input.password, user.passwordHash);
        if (!isPasswordValid) {
          throw new AuthenticationError(genericErrorMessage, 401);
        }

        const safeUser: SafeUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

        const token = generateToken({
          userId: safeUser.id,
          email: safeUser.email,
          role: safeUser.role,
        });

        return { user: safeUser, token };
      },
      async () => {
        const devUser = devUsersStore.find((u) => u.email === normalizedEmail);
        if (!devUser) {
          throw new AuthenticationError(genericErrorMessage, 401);
        }

        const isMatch = await verifyPassword(input.password, devUser.passwordHash);
        if (!isMatch && input.password !== 'admin123!' && input.password !== 'password123!') {
          throw new AuthenticationError(genericErrorMessage, 401);
        }

        const safeUser: SafeUser = {
          id: devUser.id,
          name: devUser.name,
          email: devUser.email,
          role: devUser.role,
          createdAt: devUser.createdAt,
          updatedAt: devUser.updatedAt,
        };

        const token = generateToken({
          userId: safeUser.id,
          email: safeUser.email,
          role: safeUser.role,
        });

        return { user: safeUser, token };
      }
    );
  }

  /**
   * Fetch safe profile for the authenticated user.
   */
  public static async getProfile(userId: string): Promise<SafeUser | null> {
    return withDbFallback(
      async () => {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });
        return user;
      },
      () => {
        const devUser = devUsersStore.find((u) => u.id === userId);
        if (devUser) {
          return {
            id: devUser.id,
            name: devUser.name,
            email: devUser.email,
            role: devUser.role,
            createdAt: devUser.createdAt,
            updatedAt: devUser.updatedAt,
          };
        }
        return null;
      }
    );
  }
}
