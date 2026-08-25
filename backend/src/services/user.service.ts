import { prisma, withDbFallback } from '../config/prisma';
import { hashPassword } from '../utils/password';
import { UserRole } from '@prisma/client';
import { logger } from '../utils/logger';
import { SafeUser } from '../types';

export class DuplicateEmailError extends Error {
  public statusCode = 409;
  constructor(message = 'An account with this email address already exists.') {
    super(message);
    this.name = 'DuplicateEmailError';
  }
}

export class UserNotFoundError extends Error {
  public statusCode = 404;
  constructor(message = 'User not found.') {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
  passwordHash?: string;
  role?: UserRole;
}

// In-memory development store fallback for offline mode
const devUsersStore: Array<SafeUser & { passwordHash: string }> = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'NeverQuit Admin',
    email: 'admin@neverquit.ai',
    passwordHash: '$2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Standard User',
    email: 'user@neverquit.ai',
    passwordHash: '$2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class UserService {
  /**
   * Creates a new user in PostgreSQL via Prisma.
   */
  public static async createUser(input: CreateUserInput): Promise<SafeUser> {
    const normalizedEmail = input.email.toLowerCase().trim();

    return withDbFallback(
      async () => {
        const existing = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (existing) {
          throw new DuplicateEmailError(`A user with email "${normalizedEmail}" already exists.`);
        }

        const passwordHash = await hashPassword(input.password);
        const user = await prisma.user.create({
          data: {
            name: input.name.trim(),
            email: normalizedEmail,
            passwordHash,
            role: input.role || 'USER',
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

        logger.info(`User created: ID=${user.id} (${user.email}) [Role: ${user.role}]`);
        return user;
      },
      async () => {
        const existing = devUsersStore.find((u) => u.email === normalizedEmail);
        if (existing) {
          throw new DuplicateEmailError(`A user with email "${normalizedEmail}" already exists.`);
        }

        const passwordHash = await hashPassword(input.password);
        const newUser: SafeUser & { passwordHash: string } = {
          id: `dev-user-${Date.now()}`,
          name: input.name.trim(),
          email: normalizedEmail,
          passwordHash,
          role: input.role || 'USER',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        devUsersStore.push(newUser);
        const { passwordHash: _, ...safeUser } = newUser;
        return safeUser;
      }
    );
  }

  /**
   * Finds a user by unique email address.
   */
  public static async findByEmail(email: string) {
    const normalizedEmail = email.toLowerCase().trim();

    return withDbFallback(
      async () => {
        return await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });
      },
      async () => {
        return devUsersStore.find((u) => u.email === normalizedEmail) || null;
      }
    );
  }

  /**
   * Finds a user by unique primary ID (safe user without password hash).
   */
  public static async findById(id: string): Promise<SafeUser | null> {
    return withDbFallback(
      async () => {
        return await prisma.user.findUnique({
          where: { id },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      },
      async () => {
        const found = devUsersStore.find((u) => u.id === id);
        if (!found) return null;
        const { passwordHash: _, ...safeUser } = found;
        return safeUser;
      }
    );
  }

  /**
   * Updates an existing user's attributes.
   */
  public static async updateUser(id: string, input: UpdateUserInput): Promise<SafeUser | null> {
    return withDbFallback(
      async () => {
        const existing = await prisma.user.findUnique({ where: { id } });
        if (!existing) {
          throw new UserNotFoundError(`User with ID ${id} was not found.`);
        }

        const updateData: any = {};
        if (input.name !== undefined) updateData.name = input.name.trim();
        if (input.role !== undefined) updateData.role = input.role;

        if (input.email !== undefined) {
          const normalizedEmail = input.email.toLowerCase().trim();
          if (normalizedEmail !== existing.email) {
            const conflict = await prisma.user.findUnique({ where: { email: normalizedEmail } });
            if (conflict) {
              throw new DuplicateEmailError(`A user with email "${normalizedEmail}" already exists.`);
            }
            updateData.email = normalizedEmail;
          }
        }

        if (input.password) {
          updateData.passwordHash = await hashPassword(input.password);
        } else if (input.passwordHash) {
          updateData.passwordHash = input.passwordHash;
        }

        const updated = await prisma.user.update({
          where: { id },
          data: updateData,
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        logger.info(`User updated: ID=${updated.id} (${updated.email})`);
        return updated;
      },
      async () => {
        const index = devUsersStore.findIndex((u) => u.id === id);
        if (index === -1) return null;

        const devUser = devUsersStore[index];
        if (input.email !== undefined) {
          const normalizedEmail = input.email.toLowerCase().trim();
          const conflict = devUsersStore.find((u) => u.email === normalizedEmail && u.id !== id);
          if (conflict) {
            throw new DuplicateEmailError(`A user with email "${normalizedEmail}" already exists.`);
          }
          devUser.email = normalizedEmail;
        }
        if (input.name !== undefined) devUser.name = input.name.trim();
        if (input.role !== undefined) devUser.role = input.role;
        if (input.password) {
          devUser.passwordHash = await hashPassword(input.password);
        } else if (input.passwordHash) {
          devUser.passwordHash = input.passwordHash;
        }
        devUser.updatedAt = new Date();

        const { passwordHash: _, ...safeUser } = devUser;
        return safeUser;
      }
    );
  }
}
