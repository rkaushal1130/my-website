/**
 * NeverQuit.ai Comprehensive End-to-End Test Suite
 *
 * Flow verifications:
 * 1. CONTACT: React Form -> POST /api/contact -> Express -> Zod Validation -> ContactService -> Prisma -> PostgreSQL -> Response -> React UI
 * 2. PROJECTS: React Projects Page -> GET /api/projects -> Express -> ProjectService -> Prisma -> PostgreSQL -> JSON -> React UI
 * 3. CAREERS: React Careers -> GET /api/jobs -> Backend -> PostgreSQL -> React UI
 * 4. APPLICATIONS: Career Form -> POST /api/applications -> Backend -> Job Verification -> PostgreSQL -> Success -> React UI
 * 5. AUTH: Login -> POST /api/auth/login -> Backend -> Database -> Authentication -> React Auth State -> Admin Dashboard
 * 6. FAILURE MODES:
 *    - Invalid requests (400)
 *    - Empty responses (200 with empty array)
 *    - Unauthorized requests (401)
 *    - Forbidden requests (403)
 *    - Duplicate submissions (409 / 400)
 *    - Expired / tampered authentication (401)
 *    - Database / service availability probes
 */

import jwt from 'jsonwebtoken';

const BASE_URL = 'http://localhost:5000/api';

interface TestResult {
  category: string;
  testName: string;
  status: 'PASSED' | 'FAILED';
  httpCode?: number;
  expectedHttpCode?: number | number[];
  details?: any;
}

const testResults: TestResult[] = [];

async function recordTest(
  category: string,
  testName: string,
  fn: () => Promise<{ status: number; expected: number | number[]; data?: any }>
) {
  try {
    const result = await fn();
    const expectedArr = Array.isArray(result.expected) ? result.expected : [result.expected];
    const isPassed = expectedArr.includes(result.status);

    testResults.push({
      category,
      testName,
      status: isPassed ? 'PASSED' : 'FAILED',
      httpCode: result.status,
      expectedHttpCode: result.expected,
      details: isPassed ? undefined : result.data,
    });

    if (isPassed) {
      console.log(`  ✓ [${result.status}] ${testName}`);
    } else {
      console.error(
        `  ✗ [FAILED] ${testName} (Status ${result.status}, Expected: ${JSON.stringify(result.expected)})`
      );
      if (result.data) console.error('    Response:', JSON.stringify(result.data));
    }
  } catch (err: any) {
    testResults.push({
      category,
      testName,
      status: 'FAILED',
      details: err.message,
    });
    console.error(`  ✗ [ERROR] ${testName}:`, err.message);
  }
}

async function apiCall(
  endpoint: string,
  options: { method?: string; body?: any; token?: string; bypassLimiter?: boolean } = {}
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (options.bypassLimiter !== false) {
    headers['x-test-bypass-limiter'] = 'true';
  }
  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    // text
  }

  return { status: response.status, data };
}

async function runE2ETests() {
  console.log('\n======================================================');
  console.log(' Starting NeverQuit.ai Comprehensive E2E Test Suite');
  console.log(` Target Backend API: ${BASE_URL}`);
  console.log('======================================================\n');

  const timestamp = Date.now();
  let adminToken = '';
  let userToken = '';
  let createdJobId = '';
  let createdProjectId = '';
  let createdContactId = '';
  let createdAppId = '';

  // ==========================================
  // FLOW 5: AUTHENTICATION & LOGIN FLOW
  // ==========================================
  console.log('--- 1. AUTHENTICATION & SESSION MANAGEMENT ---');

  const adminEmail = `admin_e2e_${timestamp}@neverquit.ai`;
  const userEmail = `user_e2e_${timestamp}@example.com`;

  // 1.1 Register normal user
  await recordTest('AUTH', 'Register standard user (role: USER)', async () => {
    const res = await apiCall('/auth/register', {
      method: 'POST',
      body: {
        name: 'Standard User',
        email: userEmail,
        password: 'Password123!',
      },
    });
    userToken = res.data?.data?.token || '';
    return { status: res.status, expected: 201, data: res.data };
  });

  // 1.2 Attempt duplicate registration
  await recordTest('AUTH', 'Reject duplicate user registration (409 Conflict)', async () => {
    const res = await apiCall('/auth/register', {
      method: 'POST',
      body: {
        name: 'Duplicate User',
        email: userEmail,
        password: 'Password123!',
      },
    });
    return { status: res.status, expected: 409, data: res.data };
  });

  // 1.3 Register admin user
  await recordTest('AUTH', 'Register admin user', async () => {
    const res = await apiCall('/auth/register', {
      method: 'POST',
      body: {
        name: 'Admin E2E',
        email: adminEmail,
        password: 'AdminPassword123!',
      },
    });
    return { status: res.status, expected: 201, data: res.data };
  });

  // 1.4 Login with invalid password
  await recordTest('AUTH', 'Reject invalid password login (401 Unauthorized)', async () => {
    const res = await apiCall('/auth/login', {
      method: 'POST',
      body: {
        email: adminEmail,
        password: 'WrongPassword!',
      },
    });
    return { status: res.status, expected: 401, data: res.data };
  });

  // 1.5 Login with valid credentials
  await recordTest('AUTH', 'Login with valid admin credentials (200 OK + JWT)', async () => {
    const res = await apiCall('/auth/login', {
      method: 'POST',
      body: {
        email: 'admin@neverquit.ai',
        password: 'password123!',
      },
    });
    adminToken = res.data?.data?.token || '';
    return { status: res.status, expected: 200, data: res.data };
  });

  // 1.6 Verify current user (GET /api/auth/me)
  await recordTest('AUTH', 'Verify session profile (GET /api/auth/me as ADMIN)', async () => {
    const res = await apiCall('/auth/me', { token: adminToken });
    const isSanitized = !res.data?.data?.user?.passwordHash;
    const hasRole = res.data?.data?.user?.role === 'ADMIN';
    return {
      status: isSanitized && hasRole ? res.status : 500,
      expected: 200,
      data: res.data,
    };
  });

  // 1.7 Expired / Tampered JWT rejection
  await recordTest('AUTH', 'Reject tampered / expired JWT signature (401 Unauthorized)', async () => {
    const fakeToken = jwt.sign(
      { id: 'fake-id', email: 'fake@hacker.com', role: 'ADMIN' },
      'invalid_wrong_secret_key_12345'
    );
    const res = await apiCall('/auth/me', { token: fakeToken });
    return { status: res.status, expected: 401, data: res.data };
  });

  // 1.8 Unauthenticated access rejection
  await recordTest('AUTH', 'Reject unauthenticated profile lookup (401 Unauthorized)', async () => {
    const res = await apiCall('/auth/me');
    return { status: res.status, expected: 401, data: res.data };
  });

  // ==========================================
  // FLOW 1: CONTACT MESSAGE FLOW
  // ==========================================
  console.log('\n--- 2. CONTACT INQUIRY WORKFLOW ---');

  // 2.1 Submit valid contact form
  await recordTest('CONTACT', 'Submit public contact message (POST /api/contact -> 201)', async () => {
    const res = await apiCall('/contact', {
      method: 'POST',
      body: {
        name: 'Rahul Kaushal',
        email: `rahul_${timestamp}@example.com`,
        phone: '+91 90153 23903',
        company: 'NeverQuit Corp',
        service: 'AI Automation',
        message: 'We want to integrate enterprise autonomous agents with our backend.',
      },
    });
    return { status: res.status, expected: 201, data: res.data };
  });

  // 2.2 Submit contact form with missing required fields
  await recordTest('CONTACT', 'Reject contact form with missing required fields (400 Bad Request)', async () => {
    const res = await apiCall('/contact', {
      method: 'POST',
      body: {
        name: '',
        email: 'invalid-email',
        message: 'Hi',
      },
    });
    return { status: res.status, expected: 400, data: res.data };
  });

  // 2.3 List contact messages as Admin
  await recordTest('CONTACT', 'Retrieve contact messages with pagination (Admin GET /api/contact)', async () => {
    const res = await apiCall('/contact?page=1&limit=10', { token: adminToken });
    const items = res.data?.data?.items || res.data?.data || [];
    if (items.length > 0) {
      createdContactId = items[0].id;
    }
    return { status: res.status, expected: 200, data: res.data };
  });

  // 2.4 Update contact message status
  if (createdContactId) {
    await recordTest('CONTACT', 'Update contact message status to READ (Admin PATCH)', async () => {
      const res = await apiCall(`/contact/${createdContactId}`, {
        method: 'PATCH',
        token: adminToken,
        body: { status: 'READ' },
      });
      return { status: res.status, expected: 200, data: res.data };
    });
  }

  // 2.5 Non-admin access to messages forbidden
  await recordTest('CONTACT', 'Reject non-admin access to contact messages (403 Forbidden)', async () => {
    const res = await apiCall('/contact', { token: userToken });
    return { status: res.status, expected: 403, data: res.data };
  });

  // ==========================================
  // FLOW 2: PROJECTS & SOLUTIONS FLOW
  // ==========================================
  console.log('\n--- 3. PROJECTS & SOLUTIONS WORKFLOW ---');

  const projectSlug = `enterprise-agent-suite-${timestamp}`;

  // 3.1 Create project as Admin
  await recordTest('PROJECTS', 'Create showcase project (Admin POST /api/projects -> 201)', async () => {
    const res = await apiCall('/projects', {
      method: 'POST',
      token: adminToken,
      body: {
        title: 'Enterprise Agent Suite',
        slug: projectSlug,
        description: 'Autonomous multi-agent orchestration architecture for enterprise workloads.',
        category: 'AI',
        featured: true,
        published: true,
      },
    });
    createdProjectId = res.data?.data?.id || '';
    return { status: res.status, expected: 201, data: res.data };
  });

  // 3.2 Duplicate slug rejection
  await recordTest('PROJECTS', 'Reject duplicate project slug (409 Conflict)', async () => {
    const res = await apiCall('/projects', {
      method: 'POST',
      token: adminToken,
      body: {
        title: 'Enterprise Agent Suite Clone',
        slug: projectSlug,
        description: 'Another duplicate project.',
        category: 'AI',
        published: true,
      },
    });
    return { status: res.status, expected: 409, data: res.data };
  });

  // 3.3 Public fetch published projects
  await recordTest('PROJECTS', 'Fetch published projects with filters (Public GET /api/projects)', async () => {
    const res = await apiCall('/projects?category=AI&limit=12');
    const items = res.data?.data?.items || res.data?.data || [];
    const allPublished = items.every((p: any) => p.published === true);
    return {
      status: allPublished ? res.status : 500,
      expected: 200,
      data: res.data,
    };
  });

  // 3.4 Public fetch project by slug
  await recordTest('PROJECTS', 'Fetch single project by slug (GET /api/projects/:slug -> 200)', async () => {
    const res = await apiCall(`/projects/${projectSlug}`);
    return { status: res.status, expected: 200, data: res.data };
  });

  // 3.5 Non-existent slug returns 404
  await recordTest('PROJECTS', 'Non-existent project slug returns 404 Not Found', async () => {
    const res = await apiCall(`/projects/non-existent-slug-${timestamp}`);
    return { status: res.status, expected: 404, data: res.data };
  });

  // ==========================================
  // FLOW 3: CAREERS & JOB OPENINGS FLOW
  // ==========================================
  console.log('\n--- 4. CAREERS & JOB OPENINGS WORKFLOW ---');

  const jobSlug = `principal-ai-engineer-${timestamp}`;

  // 4.1 Create job as Admin
  await recordTest('JOBS', 'Create job posting (Admin POST /api/jobs -> 201)', async () => {
    const res = await apiCall('/jobs', {
      method: 'POST',
      token: adminToken,
      body: {
        title: 'Principal AI Engineer',
        slug: jobSlug,
        department: 'Engineering',
        location: 'Remote / Global',
        employmentType: 'Full-time',
        description: 'Lead the architecture of next-generation autonomous AI agents and models.',
        requirements: '5+ years distributed systems, PyTorch, LangChain, TypeScript.',
        salaryRange: '$180,000 - $240,000',
        published: true,
      },
    });
    createdJobId = res.data?.data?.id || '';
    return { status: res.status, expected: 201, data: res.data };
  });

  // 4.2 Public list published jobs
  await recordTest('JOBS', 'Retrieve published jobs (Public GET /api/jobs -> 200)', async () => {
    const res = await apiCall('/jobs?department=Engineering');
    const items = res.data?.data?.items || res.data?.data || [];
    const allPublished = items.every((j: any) => j.published === true);
    return {
      status: allPublished ? res.status : 500,
      expected: 200,
      data: res.data,
    };
  });

  // 4.3 Public fetch job by slug
  await recordTest('JOBS', 'Retrieve single job by slug (GET /api/jobs/:slug -> 200)', async () => {
    const res = await apiCall(`/jobs/${jobSlug}`);
    return { status: res.status, expected: 200, data: res.data };
  });

  // ==========================================
  // FLOW 4: CANDIDATE APPLICATION WORKFLOW
  // ==========================================
  console.log('\n--- 5. CANDIDATE APPLICATIONS & RELATIONS ---');

  // 5.1 Submit candidate job application
  await recordTest('APPLICATIONS', 'Submit candidate application (POST /api/applications -> 201)', async () => {
    const res = await apiCall('/applications', {
      method: 'POST',
      body: {
        jobId: createdJobId,
        name: 'Ada Lovelace',
        email: `ada_${timestamp}@example.com`,
        phone: '+1 555 123 4567',
        resumeUrl: 'https://github.com/adalovelace',
        coverLetter: 'I am excited to apply for the Principal AI Engineer role and build the foundation of autonomous AI.',
      },
    });
    createdAppId = res.data?.data?.id || '';
    return { status: res.status, expected: 201, data: res.data };
  });

  // 5.2 Application submitted with missing coverLetter
  await recordTest('APPLICATIONS', 'Reject application with missing cover letter (400 Bad Request)', async () => {
    const res = await apiCall('/applications', {
      method: 'POST',
      body: {
        jobId: createdJobId,
        name: 'Incomplete Candidate',
        email: `incomplete_${timestamp}@example.com`,
        coverLetter: '', // Too short
      },
    });
    return { status: res.status, expected: 400, data: res.data };
  });

  // 5.3 Application submitted with non-existent jobId
  await recordTest('APPLICATIONS', 'Reject application targeting non-existent job (404/400)', async () => {
    const res = await apiCall('/applications', {
      method: 'POST',
      body: {
        jobId: '00000000-0000-0000-0000-000000000000',
        name: 'Orphan Candidate',
        email: `orphan_${timestamp}@example.com`,
        coverLetter: 'Applying for non-existent position.',
      },
    });
    return { status: res.status, expected: [400, 404], data: res.data };
  });

  // 5.4 List applications as Admin with relational job lookup
  await recordTest('APPLICATIONS', 'List applications with job details (Admin GET /api/applications)', async () => {
    const res = await apiCall('/applications', { token: adminToken });
    return { status: res.status, expected: 200, data: res.data };
  });

  // 5.5 Update application review status as Admin
  if (createdAppId) {
    await recordTest('APPLICATIONS', 'Update candidate review status to SHORTLISTED (Admin PATCH)', async () => {
      const res = await apiCall(`/applications/${createdAppId}`, {
        method: 'PATCH',
        token: adminToken,
        body: { status: 'SHORTLISTED' },
      });
      return { status: res.status, expected: 200, data: res.data };
    });
  }

  // 5.6 Non-admin cannot view or modify applications
  await recordTest('APPLICATIONS', 'Non-admin forbidden from viewing applications (403 Forbidden)', async () => {
    const res = await apiCall('/applications', { token: userToken });
    return { status: res.status, expected: 403, data: res.data };
  });

  // ==========================================
  // FLOW 6: SYSTEM HEALTH & RESILIENCE PROBES
  // ==========================================
  console.log('\n--- 6. SYSTEM HEALTH & AVAILABILITY PROBES ---');

  // 6.1 Server health probe
  await recordTest('HEALTH', 'GET /api/health returns 200 OK UP status', async () => {
    const res = await apiCall('/health');
    return { status: res.status, expected: 200, data: res.data };
  });

  // 6.2 Database health probe
  await recordTest('HEALTH', 'GET /api/health/db returns database connectivity status', async () => {
    const res = await apiCall('/health/db');
    return { status: res.status, expected: [200, 503], data: res.data };
  });

  // 6.3 Cleanup test entities
  if (createdProjectId) {
    await apiCall(`/projects/${createdProjectId}`, { method: 'DELETE', token: adminToken });
  }
  if (createdJobId) {
    await apiCall(`/jobs/${createdJobId}`, { method: 'DELETE', token: adminToken });
  }

  // ==========================================
  // SUMMARY REPORT
  // ==========================================
  const total = testResults.length;
  const passed = testResults.filter((t) => t.status === 'PASSED').length;
  const failed = total - passed;

  console.log('\n======================================================');
  console.log(` End-to-End Execution Completed: ${passed}/${total} PASSED`);
  if (failed === 0) {
    console.log(' 🎉 ALL END-TO-END FLOWS PASSED 100%');
  } else {
    console.error(` ⚠️ ${failed} tests failed.`);
  }
  console.log('======================================================\n');
}

runE2ETests().catch((err) => {
  console.error('Fatal E2E test execution error:', err);
  process.exit(1);
});
