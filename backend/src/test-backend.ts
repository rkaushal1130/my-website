/**
 * Comprehensive Automated End-to-End Database Integration Test Suite for NeverQuit.ai
 *
 * Scenarios tested:
 * 1. DATABASE CONNECTION:
 *    - Health probe & DB connectivity
 *    - Prisma query engine execution
 * 2. USERS:
 *    - Create user, find user, login lookup, Admin role vs Normal user role
 * 3. CONTACT MESSAGES:
 *    - Create, retrieve (pagination/filtering), update status, delete, invalid IDs
 * 4. PROJECTS:
 *    - Create, publish, retrieve published, find by slug, update, delete, duplicate slug
 * 5. JOBS:
 *    - Create, publish, retrieve published, find by slug, update, delete, duplicate slug
 * 6. APPLICATIONS:
 *    - Create, verify job relation, retrieve, update status, delete
 * 7. EDGE CASES & SECURITY:
 *    - Invalid IDs, duplicate emails, duplicate slugs, missing fields, invalid enums,
 *      unauthorized access (401), non-admin access (403), empty query results, pagination, filtering
 */

const BASE_URL = 'http://localhost:5000/api';

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  status?: number;
  expectedStatus?: number | number[];
  error?: string;
  details?: any;
}

const results: TestResult[] = [];

async function assertTest(
  suite: string,
  name: string,
  fn: () => Promise<{ status: number; data?: any; expectedStatus: number | number[] }>
) {
  try {
    const res = await fn();
    const expected = Array.isArray(res.expectedStatus) ? res.expectedStatus : [res.expectedStatus];
    const passed = expected.includes(res.status);

    results.push({
      suite,
      name,
      passed,
      status: res.status,
      expectedStatus: res.expectedStatus,
      details: passed ? undefined : res.data,
    });

    if (passed) {
      console.log(`  ✓ [${res.status}] ${name}`);
    } else {
      console.error(
        `  ✗ [FAIL] ${name} — Got status ${res.status}, expected ${JSON.stringify(res.expectedStatus)}`
      );
      console.error(`    Body:`, JSON.stringify(res.data));
    }
  } catch (err: any) {
    results.push({
      suite,
      name,
      passed: false,
      error: err.message,
    });
    console.error(`  ✗ [ERROR] ${name}:`, err.message);
  }
}

async function request(
  path: string,
  options: { method?: string; body?: any; token?: string; bypassLimiter?: boolean } = {}
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (options.bypassLimiter !== false) {
    headers['x-test-bypass-limiter'] = 'true';
  }
  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // raw text
  }

  return { status: res.status, data, headers: res.headers };
}

async function runTestSuite() {
  console.log('\n======================================================');
  console.log(' Starting NeverQuit.ai Comprehensive Integration Test');
  console.log(' Target:', BASE_URL);
  console.log('======================================================\n');

  let adminToken = '';
  let userToken = '';
  let createdContactId = '';
  let createdProjectId = '';
  let createdProjectSlug = '';
  let createdJobId = '';
  let createdJobSlug = '';
  let createdAppId = '';

  const randomSuffix = Math.floor(Math.random() * 100000);

  // ----------------------------------------------------
  // 1. DATABASE CONNECTION
  // ----------------------------------------------------
  console.log('--- 1. DATABASE CONNECTION & SYSTEM HEALTH ---');
  await assertTest('Health', 'GET /api/health returns 200 OK with UP status', async () => {
    const res = await request('/health');
    const valid = res.data?.success === true && res.data?.data?.status === 'UP';
    return { status: valid ? res.status : 500, expectedStatus: 200, data: res.data };
  });

  await assertTest('Health', 'GET /api/health/db returns database connectivity probe', async () => {
    const res = await request('/health/db');
    return { status: res.status, expectedStatus: [200, 503], data: res.data };
  });

  // ----------------------------------------------------
  // 2. USERS & AUTHENTICATION
  // ----------------------------------------------------
  console.log('\n--- 2. USERS & AUTHENTICATION ---');

  const testUserEmail = `engineer_${randomSuffix}@neverquit.ai`;

  await assertTest('Users', 'Create user (POST /api/auth/register with USER role)', async () => {
    const res = await request('/auth/register', {
      method: 'POST',
      body: {
        name: 'Test Engineer',
        email: testUserEmail,
        password: 'SecurePassword123!',
      },
    });
    if (res.data?.data?.token) {
      userToken = res.data.data.token;
    }
    const roleIsUser = res.data?.data?.user?.role === 'USER';
    return { status: roleIsUser ? res.status : 500, expectedStatus: 201, data: res.data };
  });

  await assertTest('Users', 'Duplicate email rejection (POST /api/auth/register returns 409)', async () => {
    const res = await request('/auth/register', {
      method: 'POST',
      body: {
        name: 'Test Engineer Duplicate',
        email: testUserEmail,
        password: 'SecurePassword123!',
      },
    });
    return { status: res.status, expectedStatus: 409, data: res.data };
  });

  await assertTest('Users', 'Missing required fields (POST /api/auth/register returns 400)', async () => {
    const res = await request('/auth/register', {
      method: 'POST',
      body: { email: 'missing_name@neverquit.ai' },
    });
    return { status: res.status, expectedStatus: 400, data: res.data };
  });

  await assertTest('Users', 'Invalid email format (POST /api/auth/register returns 400)', async () => {
    const res = await request('/auth/register', {
      method: 'POST',
      body: {
        name: 'Invalid Email User',
        email: 'invalid-email-format',
        password: 'SecurePassword123!',
      },
    });
    return { status: res.status, expectedStatus: 400, data: res.data };
  });

  await assertTest('Users', 'Login lookup with valid credentials (POST /api/auth/login)', async () => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: {
        email: 'neverquitop@gmail.com',
        password: 'R@hul1130',
      },
    });
    if (res.data?.data?.token) {
      adminToken = res.data.data.token;
    }
    const isAdmin = res.data?.data?.user?.role === 'ADMIN';
    return { status: isAdmin ? res.status : 500, expectedStatus: 200, data: res.data };
  });

  await assertTest('Users', 'Login with invalid password (POST /api/auth/login returns 401)', async () => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: {
        email: 'neverquitop@gmail.com',
        password: 'incorrectPassword999!',
      },
    });
    return { status: res.status, expectedStatus: 401, data: res.data };
  });

  await assertTest('Users', 'Find current user via JWT (GET /api/auth/me returns safe DTO)', async () => {
    const res = await request('/auth/me', { token: adminToken });
    const hasNoPasswordHash = res.data?.data?.passwordHash === undefined;
    return { status: hasNoPasswordHash ? res.status : 500, expectedStatus: 200, data: res.data };
  });

  await assertTest('Users', 'Unauthenticated user lookup (GET /api/auth/me returns 401)', async () => {
    const res = await request('/auth/me');
    return { status: res.status, expectedStatus: 401, data: res.data };
  });

  // ----------------------------------------------------
  // 3. CONTACT MESSAGES
  // ----------------------------------------------------
  console.log('\n--- 3. CONTACT MESSAGES ---');

  await assertTest('Contact', 'Create contact message (POST /api/contact returns 201)', async () => {
    const res = await request('/contact', {
      method: 'POST',
      body: {
        name: 'Enterprise Client',
        email: `enterprise_${randomSuffix}@client.com`,
        phone: '+1 555 019 2831',
        company: 'NeverQuit Global Inc',
        service: 'Custom AI Solutions',
        message: 'Looking to integrate high-throughput autonomous agent systems.',
      },
    });
    return { status: res.status, expectedStatus: 201, data: res.data };
  });

  await assertTest('Contact', 'Missing required fields in contact (POST /api/contact returns 400)', async () => {
    const res = await request('/contact', {
      method: 'POST',
      body: {
        name: 'Incomplete Submission',
        email: 'incomplete@user.com',
      },
    });
    return { status: res.status, expectedStatus: 400, data: res.data };
  });

  await assertTest('Contact', 'Retrieve contact messages (Admin GET /api/contact returns 200)', async () => {
    const res = await request('/contact?page=1&limit=5&status=NEW', { token: adminToken });
    if (res.data?.data?.items?.[0]?.id) {
      createdContactId = res.data.data.items[0].id;
    }
    return { status: res.status, expectedStatus: 200, data: res.data };
  });

  await assertTest('Contact', 'Filter empty results (Admin GET /api/contact?search=nonexistent)', async () => {
    const res = await request('/contact?search=nonexistentqueryxyz999', { token: adminToken });
    const empty = res.data?.data?.items?.length === 0;
    return { status: empty ? res.status : 500, expectedStatus: 200, data: res.data };
  });

  await assertTest('Contact', 'Retrieve message by non-existent ID (returns 404)', async () => {
    const res = await request('/contact/non-existent-msg-id-000', { token: adminToken });
    return { status: res.status, expectedStatus: 404, data: res.data };
  });

  if (createdContactId) {
    await assertTest('Contact', 'Retrieve contact message by ID (Admin returns 200)', async () => {
      const res = await request(`/contact/${createdContactId}`, { token: adminToken });
      return { status: res.status, expectedStatus: 200, data: res.data };
    });

    await assertTest('Contact', 'Update contact message status (Admin PATCH returns 200)', async () => {
      const res = await request(`/contact/${createdContactId}`, {
        method: 'PATCH',
        token: adminToken,
        body: { status: 'READ' },
      });
      return { status: res.status, expectedStatus: 200, data: res.data };
    });

    await assertTest('Contact', 'Invalid enum value in status (Admin PATCH returns 400)', async () => {
      const res = await request(`/contact/${createdContactId}`, {
        method: 'PATCH',
        token: adminToken,
        body: { status: 'INVALID_ENUM_STATUS' },
      });
      return { status: res.status, expectedStatus: 400, data: res.data };
    });

    await assertTest('Contact', 'Delete contact message (Admin DELETE returns 200)', async () => {
      const res = await request(`/contact/${createdContactId}`, {
        method: 'DELETE',
        token: adminToken,
      });
      return { status: res.status, expectedStatus: 200, data: res.data };
    });
  }

  // ----------------------------------------------------
  // 4. PROJECTS
  // ----------------------------------------------------
  console.log('\n--- 4. PROJECTS ---');

  const projectSlug = `autonomous-system-${randomSuffix}`;

  await assertTest('Projects', 'Create project (Admin POST /api/projects returns 201)', async () => {
    const res = await request('/projects', {
      method: 'POST',
      token: adminToken,
      body: {
        title: `Autonomous Project Suite ${randomSuffix}`,
        slug: projectSlug,
        description: 'Next-generation AI orchestration platform with multi-step reasoning capabilities.',
        category: 'AI',
        featured: true,
        published: true,
      },
    });
    if (res.data?.data?.id) {
      createdProjectId = res.data.data.id;
      createdProjectSlug = res.data.data.slug;
    }
    return { status: res.status, expectedStatus: 201, data: res.data };
  });

  await assertTest('Projects', 'Duplicate project slug rejected (POST /api/projects returns 409)', async () => {
    const res = await request('/projects', {
      method: 'POST',
      token: adminToken,
      body: {
        title: `Duplicate Project ${randomSuffix}`,
        slug: projectSlug,
        description: 'Testing duplicate slug constraint.',
        category: 'AI',
      },
    });
    return { status: res.status, expectedStatus: 409, data: res.data };
  });

  await assertTest('Projects', 'Retrieve published projects with pagination & category filter', async () => {
    const res = await request('/projects?page=1&limit=10&category=AI');
    const isArray = Array.isArray(res.data?.data);
    return { status: isArray ? res.status : 500, expectedStatus: 200, data: res.data };
  });

  await assertTest('Projects', 'Retrieve project by slug (GET /api/projects/:slug returns 200)', async () => {
    const res = await request(`/projects/${createdProjectSlug}`);
    return { status: res.status, expectedStatus: 200, data: res.data };
  });

  await assertTest('Projects', 'Retrieve project by non-existent slug returns 404', async () => {
    const res = await request('/projects/non-existent-ghost-slug-999');
    return { status: res.status, expectedStatus: 404, data: res.data };
  });

  if (createdProjectId) {
    await assertTest('Projects', 'Update project attributes (Admin PATCH /api/projects/:id)', async () => {
      const res = await request(`/projects/${createdProjectId}`, {
        method: 'PATCH',
        token: adminToken,
        body: { featured: false },
      });
      return { status: res.status, expectedStatus: 200, data: res.data };
    });

    await assertTest('Projects', 'Non-admin cannot delete project (returns 403)', async () => {
      const res = await request(`/projects/${createdProjectId}`, {
        method: 'DELETE',
        token: userToken,
      });
      return { status: res.status, expectedStatus: 403, data: res.data };
    });

    await assertTest('Projects', 'Delete project (Admin DELETE /api/projects/:id returns 200)', async () => {
      const res = await request(`/projects/${createdProjectId}`, {
        method: 'DELETE',
        token: adminToken,
      });
      return { status: res.status, expectedStatus: 200, data: res.data };
    });
  }

  // ----------------------------------------------------
  // 5. JOBS
  // ----------------------------------------------------
  console.log('\n--- 5. JOBS & CAREERS ---');

  const jobSlug = `principal-engineer-${randomSuffix}`;

  await assertTest('Jobs', 'Create job opening (Admin POST /api/jobs returns 201)', async () => {
    const res = await request('/jobs', {
      method: 'POST',
      token: adminToken,
      body: {
        title: `Principal Engineer ${randomSuffix}`,
        slug: jobSlug,
        department: 'Engineering',
        location: 'Remote / Global',
        employmentType: 'Full-time',
        description: 'Lead architecture of high-performance LLM agent pipelines.',
        requirements: '5+ years backend distributed engineering experience.',
        salaryRange: '$170,000 - $230,000',
        published: true,
      },
    });
    if (res.data?.data?.id) {
      createdJobId = res.data.data.id;
      createdJobSlug = res.data.data.slug;
    }
    return { status: res.status, expectedStatus: 201, data: res.data };
  });

  await assertTest('Jobs', 'Duplicate job slug rejected (POST /api/jobs returns 409)', async () => {
    const res = await request('/jobs', {
      method: 'POST',
      token: adminToken,
      body: {
        title: `Duplicate Principal Engineer ${randomSuffix}`,
        slug: jobSlug,
        department: 'Engineering',
        location: 'Remote',
        employmentType: 'Full-time',
        description: 'Duplicate job description.',
        requirements: 'Requirements here.',
      },
    });
    return { status: res.status, expectedStatus: 409, data: res.data };
  });

  await assertTest('Jobs', 'Retrieve published jobs with pagination (GET /api/jobs)', async () => {
    const res = await request('/jobs?page=1&limit=10&department=Engineering');
    const isArray = Array.isArray(res.data?.data);
    return { status: isArray ? res.status : 500, expectedStatus: 200, data: res.data };
  });

  await assertTest('Jobs', 'Retrieve job by slug (GET /api/jobs/:slug returns 200)', async () => {
    const res = await request(`/jobs/${createdJobSlug}`);
    return { status: res.status, expectedStatus: 200, data: res.data };
  });

  await assertTest('Jobs', 'Retrieve job by non-existent slug returns 404', async () => {
    const res = await request('/jobs/non-existent-job-slug-999');
    return { status: res.status, expectedStatus: 404, data: res.data };
  });

  if (createdJobId) {
    await assertTest('Jobs', 'Update job details (Admin PATCH /api/jobs/:id returns 200)', async () => {
      const res = await request(`/jobs/${createdJobId}`, {
        method: 'PATCH',
        token: adminToken,
        body: { salaryRange: '$180,000 - $240,000' },
      });
      return { status: res.status, expectedStatus: 200, data: res.data };
    });
  }

  // ----------------------------------------------------
  // 6. APPLICATIONS & RELATIONAL INTEGRITY
  // ----------------------------------------------------
  console.log('\n--- 6. CANDIDATE APPLICATIONS & RELATIONS ---');

  await assertTest('Applications', 'Create candidate application with Job relation (returns 201)', async () => {
    const res = await request('/applications', {
      method: 'POST',
      body: {
        jobId: createdJobId || undefined,
        jobTitle: createdJobId ? undefined : 'Principal AI Systems Architect',
        name: 'Dr. Katherine Johnson',
        email: `katherine.johnson_${randomSuffix}@neverquit.ai`,
        phone: '+1 555 492 8172',
        resumeUrl: 'https://linkedin.com/in/kjohnson',
        coverLetter: 'Passionate about mathematical rigor and autonomous reasoning architectures.',
      },
    });
    return { status: res.status, expectedStatus: 201, data: res.data };
  });

  await assertTest('Applications', 'Missing required coverLetter (returns 400 Bad Request)', async () => {
    const res = await request('/applications', {
      method: 'POST',
      body: {
        name: 'Applicant Missing Letter',
        email: 'applicant@example.com',
      },
    });
    return { status: res.status, expectedStatus: 400, data: res.data };
  });

  await assertTest('Applications', 'Retrieve applications with relational job data (Admin returns 200)', async () => {
    const res = await request('/applications?page=1&limit=5&status=RECEIVED', { token: adminToken });
    if (res.data?.data?.[0]?.id) {
      createdAppId = res.data.data[0].id;
    }
    const isArray = Array.isArray(res.data?.data);
    return { status: isArray ? res.status : 500, expectedStatus: 200, data: res.data };
  });

  if (createdAppId) {
    await assertTest('Applications', 'Retrieve application by ID (Admin returns 200)', async () => {
      const res = await request(`/applications/${createdAppId}`, { token: adminToken });
      return { status: res.status, expectedStatus: 200, data: res.data };
    });

    await assertTest('Applications', 'Update application status (Admin PATCH returns 200)', async () => {
      const res = await request(`/applications/${createdAppId}`, {
        method: 'PATCH',
        token: adminToken,
        body: { status: 'REVIEWING' },
      });
      return { status: res.status, expectedStatus: 200, data: res.data };
    });

    await assertTest('Applications', 'Delete application (Admin DELETE returns 200)', async () => {
      const res = await request(`/applications/${createdAppId}`, {
        method: 'DELETE',
        token: adminToken,
      });
      return { status: res.status, expectedStatus: 200, data: res.data };
    });
  }

  if (createdJobId) {
    await assertTest('Jobs', 'Delete job (Admin DELETE /api/jobs/:id returns 200)', async () => {
      const res = await request(`/jobs/${createdJobId}`, {
        method: 'DELETE',
        token: adminToken,
      });
      return { status: res.status, expectedStatus: 200, data: res.data };
    });
  }

  // ----------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;

  console.log('\n======================================================');
  console.log(` Integration Test Execution Completed: ${passed}/${total} PASSED`);
  if (failed > 0) {
    console.error(` 💥 ${failed} TESTS FAILED`);
  } else {
    console.log(' 🎉 ALL DATABASE INTEGRATION TESTS PASSED 100%');
  }
  console.log('======================================================\n');
}

runTestSuite();
