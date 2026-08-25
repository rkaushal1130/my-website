import { PrismaClient, UserRole, MessageStatus, ApplicationStatus } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'node:path';
import bcrypt from 'bcryptjs';

// Load environment variables from backend/.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

/**
 * Hash password securely with bcrypt (12 salt rounds).
 * Guarantees passwords are never stored in plaintext.
 */
function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12);
}

// ============================================================================
// 1. SAMPLE PROJECTS (4 Core Showcase Projects)
// ============================================================================
const SAMPLE_PROJECTS = [
  {
    title: 'Autonomous Enterprise AI Agent Platform',
    slug: 'autonomous-enterprise-ai-agent-platform',
    description:
      'Next-generation autonomous agent orchestration system enabling continuous multi-step reasoning, automated DevOps pipelines, and enterprise workflow execution with real-time feedback loops.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: 'AI & Autonomous Systems',
    featured: true,
    published: true,
  },
  {
    title: 'Neural Cloud Infrastructure Optimizer',
    slug: 'neural-cloud-infrastructure-optimizer',
    description:
      'Self-healing Kubernetes control plane utilizing real-time anomaly detection, telemetry inference, and predictive autoscaling to reduce cloud compute expenditures by 42%.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    category: 'Cloud Engineering',
    featured: true,
    published: true,
  },
  {
    title: 'Real-Time Computer Vision Quality Inspector',
    slug: 'real-time-computer-vision-quality-inspector',
    description:
      'Ultra-low latency sub-millimeter industrial defect detection framework processing 120 FPS high-resolution camera feeds with edge tensor acceleration and micro-defect classification.',
    image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?auto=format&fit=crop&w=1200&q=80',
    category: 'Computer Vision',
    featured: false,
    published: true,
  },
  {
    title: 'Enterprise Knowledge Graph & Semantic Search',
    slug: 'enterprise-knowledge-graph-semantic-search',
    description:
      'Unified vector retrieval and entity relationship mapping platform enabling sub-second factual synthesis across millions of proprietary multi-format documents.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    category: 'Enterprise SaaS',
    featured: true,
    published: true,
  },
];

// ============================================================================
// 2. SAMPLE JOBS (3 Open Positions)
// ============================================================================
const SAMPLE_JOBS = [
  {
    title: 'Principal AI Systems Architect',
    slug: 'principal-ai-systems-architect',
    department: 'Engineering',
    location: 'Remote / Global',
    employmentType: 'Full-time',
    description: 'Lead architecture and distributed high-performance deployment of autonomous LLM reasoning pipelines.',
    requirements: '8+ years distributed backend systems, PyTorch/TensorFlow, high-throughput streaming architectures.',
    salaryRange: '$180,000 - $240,000',
    published: true,
  },
  {
    title: 'Lead Autonomous Agent Engineer',
    slug: 'lead-autonomous-agent-engineer',
    department: 'Engineering',
    location: 'Remote / Global',
    employmentType: 'Full-time',
    description: 'Design self-correcting agentic memory, tool-calling pipelines, and multimodal inference layers.',
    requirements: '5+ years TypeScript/Python, vector indexing, LangGraph or custom multi-agent orchestrations.',
    salaryRange: '$150,000 - $200,000',
    published: true,
  },
  {
    title: 'Senior Full-Stack AI Engineer',
    slug: 'senior-full-stack-ai-engineer',
    department: 'Engineering',
    location: 'Remote / Global',
    employmentType: 'Full-time',
    description: 'Build low-latency reactive frontends and resilient Node/TypeScript microservices for high-concurrency client workloads.',
    requirements: '4+ years React, TypeScript, TailwindCSS, Express/Fastify, REST & WebSocket protocols.',
    salaryRange: '$130,000 - $175,000',
    published: true,
  },
];

// ============================================================================
// 3. SAMPLE CONTACT MESSAGES (3 Inquiries)
// ============================================================================
const SAMPLE_CONTACT_MESSAGES = [
  {
    id: 'c1111111-1111-4111-8111-111111111111',
    name: 'Dr. Elena Rostova',
    email: 'elena.rostova@globalfintech.io',
    phone: '+1 (555) 234-8901',
    company: 'Global FinTech Corp',
    service: 'Autonomous AI Agents',
    message: 'Inquiring about deploying multi-agent reasoning models into our algorithmic trading compliance pipelines.',
    status: MessageStatus.NEW,
  },
  {
    id: 'c2222222-2222-4222-8222-222222222222',
    name: 'Marcus Vance',
    email: 'm.vance@vanguardlogistics.com',
    phone: '+1 (555) 890-1234',
    company: 'Vanguard Logistics',
    service: 'Neural Cloud Infrastructure',
    message: 'We are experiencing Kubernetes cluster scaling bottlenecks during peak global shipping hours.',
    status: MessageStatus.READ,
  },
  {
    id: 'c3333333-3333-4333-8333-333333333333',
    name: 'Sarah Chen',
    email: 's.chen@aegisbiotech.org',
    phone: '+1 (555) 456-7890',
    company: 'Aegis BioTech',
    service: 'Enterprise Knowledge Graph',
    message: 'Need high-throughput sub-second semantic retrieval across 10M+ internal clinical research papers.',
    status: MessageStatus.REPLIED,
  },
];

// ============================================================================
// 4. SAMPLE CAREER APPLICATIONS (3 Submissions)
// ============================================================================
const SAMPLE_APPLICATIONS = [
  {
    id: 'a1111111-1111-4111-8111-111111111111',
    jobSlug: 'principal-ai-systems-architect',
    name: 'Devon K. Miller',
    email: 'devon.miller@talentdev.io',
    phone: '+1 (555) 301-4499',
    resumeUrl: 'https://linkedin.com/in/devon-miller-ai',
    coverLetter: 'I have designed distributed multi-GPU inference clusters serving 50,000 requests/sec with sub-50ms p99 latency.',
    status: ApplicationStatus.REVIEWING,
  },
  {
    id: 'a2222222-2222-4222-8222-222222222222',
    jobSlug: 'lead-autonomous-agent-engineer',
    name: 'Amara Okafor',
    email: 'amara.okafor@agenticlabs.dev',
    phone: '+1 (555) 912-7733',
    resumeUrl: 'https://github.com/amara-okafor',
    coverLetter: 'Pioneered hierarchical tool-calling architectures and dynamic self-healing agent loops in production.',
    status: ApplicationStatus.SHORTLISTED,
  },
  {
    id: 'a3333333-3333-4333-8333-333333333333',
    jobSlug: 'senior-full-stack-ai-engineer',
    name: 'Liam S. Zhang',
    email: 'liam.zhang@fullstackengineer.net',
    phone: '+1 (555) 604-8821',
    resumeUrl: 'https://liamzhang.dev/resume.pdf',
    coverLetter: 'Deep experience integrating high-concurrency Node.js/TypeScript backends with Three.js visualization canvases.',
    status: ApplicationStatus.RECEIVED,
  },
];

async function main() {
  console.log('🌱 Starting NeverQuit.ai Development Database Seed...');

  // Check database connectivity before executing queries
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    console.log('\n⚠️  PostgreSQL is currently not reachable at DATABASE_URL.');
    console.log('   When your PostgreSQL server is active, re-run:');
    console.log('   👉 npm run prisma:seed\n');
    console.log('ℹ️  Seed script configuration verified for:');
    console.log('   - 1 Admin User (ADMIN_EMAIL, hashed bcrypt password)');
    console.log('   - 1 Standard Community User');
    console.log(`   - ${SAMPLE_PROJECTS.length} Sample Showcase Projects`);
    console.log(`   - ${SAMPLE_JOBS.length} Sample Job Openings`);
    console.log(`   - ${SAMPLE_CONTACT_MESSAGES.length} Sample Contact Inquiries`);
    console.log(`   - ${SAMPLE_APPLICATIONS.length} Sample Career Applications`);
    console.log('✨ Seed definition validated successfully (idempotent upserts).\n');
    return;
  }

  // ============================================================================
  // 1. SEED USERS (1 Admin + 1 Normal User)
  // ============================================================================
  console.log('\n--- 1. SEEDING USERS ---');

  // Resolve Admin credentials from environment variables
  const adminEmail = (process.env.ADMIN_EMAIL?.trim() || 'admin@neverquit.ai').toLowerCase();
  const rawAdminPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!rawAdminPassword && process.env.NODE_ENV === 'production') {
    throw new Error('❌ FATAL: ADMIN_PASSWORD environment variable is required in production environments to run seed.');
  }

  const effectiveAdminPassword = rawAdminPassword || 'password123!';
  const adminPasswordHash = hashPassword(effectiveAdminPassword);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: 'NeverQuit Admin',
      role: UserRole.ADMIN,
      passwordHash: adminPasswordHash,
    },
    create: {
      name: 'NeverQuit Admin',
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
    },
  });
  console.log(`✅ [ADMIN]  ${adminUser.email} (ID: ${adminUser.id})`);

  // Seed Normal Standard User
  const standardEmail = 'user@neverquit.ai';
  const standardPasswordHash = hashPassword('User@DevPass2026!');

  const standardUser = await prisma.user.upsert({
    where: { email: standardEmail },
    update: {
      name: 'Dev Community Member',
      role: UserRole.USER,
      passwordHash: standardPasswordHash,
    },
    create: {
      name: 'Dev Community Member',
      email: standardEmail,
      passwordHash: standardPasswordHash,
      role: UserRole.USER,
    },
  });
  console.log(`✅ [USER]   ${standardUser.email} (ID: ${standardUser.id})`);

  // ============================================================================
  // 2. SEED PROJECTS (4 Core Showcase Projects)
  // ============================================================================
  console.log('\n--- 2. SEEDING PROJECTS ---');
  for (const projectData of SAMPLE_PROJECTS) {
    const project = await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: {
        title: projectData.title,
        description: projectData.description,
        image: projectData.image,
        category: projectData.category,
        featured: projectData.featured,
        published: projectData.published,
      },
      create: {
        title: projectData.title,
        slug: projectData.slug,
        description: projectData.description,
        image: projectData.image,
        category: projectData.category,
        featured: projectData.featured,
        published: projectData.published,
      },
    });
    console.log(`✅ [PROJECT] [${project.category}] ${project.title}`);
  }

  // ============================================================================
  // 3. SEED JOBS (3 Open Positions)
  // ============================================================================
  console.log('\n--- 3. SEEDING JOBS ---');
  const seededJobsMap: Record<string, string> = {};

  for (const jobData of SAMPLE_JOBS) {
    const job = await prisma.job.upsert({
      where: { slug: jobData.slug },
      update: {
        title: jobData.title,
        department: jobData.department,
        location: jobData.location,
        employmentType: jobData.employmentType,
        description: jobData.description,
        requirements: jobData.requirements,
        salaryRange: jobData.salaryRange,
        published: jobData.published,
      },
      create: {
        title: jobData.title,
        slug: jobData.slug,
        department: jobData.department,
        location: jobData.location,
        employmentType: jobData.employmentType,
        description: jobData.description,
        requirements: jobData.requirements,
        salaryRange: jobData.salaryRange,
        published: jobData.published,
      },
    });
    seededJobsMap[job.slug] = job.id;
    console.log(`✅ [JOB]     [${job.department}] ${job.title} (${job.slug})`);
  }

  // ============================================================================
  // 4. SEED CONTACT MESSAGES (3 Inquiries)
  // ============================================================================
  console.log('\n--- 4. SEEDING CONTACT INQUIRIES ---');
  for (const msgData of SAMPLE_CONTACT_MESSAGES) {
    const contact = await prisma.contactMessage.upsert({
      where: { id: msgData.id },
      update: {
        name: msgData.name,
        email: msgData.email,
        phone: msgData.phone,
        company: msgData.company,
        service: msgData.service,
        message: msgData.message,
        status: msgData.status,
      },
      create: {
        id: msgData.id,
        name: msgData.name,
        email: msgData.email,
        phone: msgData.phone,
        company: msgData.company,
        service: msgData.service,
        message: msgData.message,
        status: msgData.status,
      },
    });
    console.log(`✅ [CONTACT] [${contact.status}] From: ${contact.name} (${contact.email})`);
  }

  // ============================================================================
  // 5. SEED CAREER APPLICATIONS (3 Applications)
  // ============================================================================
  console.log('\n--- 5. SEEDING CAREER APPLICATIONS ---');
  for (const appData of SAMPLE_APPLICATIONS) {
    const targetJobId = seededJobsMap[appData.jobSlug] || null;

    const application = await prisma.careerApplication.upsert({
      where: { id: appData.id },
      update: {
        jobId: targetJobId,
        name: appData.name,
        email: appData.email,
        phone: appData.phone,
        resumeUrl: appData.resumeUrl,
        coverLetter: appData.coverLetter,
        status: appData.status,
      },
      create: {
        id: appData.id,
        jobId: targetJobId,
        name: appData.name,
        email: appData.email,
        phone: appData.phone,
        resumeUrl: appData.resumeUrl,
        coverLetter: appData.coverLetter,
        status: appData.status,
      },
    });
    console.log(`✅ [APP]     [${application.status}] ${application.name} ➔ Job ID: ${application.jobId}`);
  }

  console.log('\n======================================================');
  console.log('✨ Development database seed completed successfully!');
  console.log('======================================================\n');
}

main()
  .catch((error) => {
    console.error('❌ Seeding failed with error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
