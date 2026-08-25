export class HealthService {
  public static getHealthStatus() {
    return {
      name: 'NeverquiT.ai API',
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
    };
  }
}
