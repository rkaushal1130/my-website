import { Request, Response } from 'express';
import { HealthService } from '../services/health.service';
import { checkDatabaseHealth } from '../config/database';
import { sendSuccess } from '../utils/response';

export class HealthController {
  /**
   * System health status check
   * GET /api/health
   */
  public static getHealth(req: Request, res: Response) {
    const details = HealthService.getHealthStatus();

    return sendSuccess(
      res,
      details,
      'NeverQuit.ai API is running',
      200
    );
  }

  /**
   * Database connectivity health probe
   * GET /api/health/db
   */
  public static async getDbHealth(req: Request, res: Response) {
    const dbStatus = await checkDatabaseHealth();

    if (dbStatus.healthy) {
      return res.status(200).json({
        success: true,
        message: 'Database connection is healthy',
      });
    }

    return res.status(503).json({
      success: false,
      message: 'Database connection is unavailable',
    });
  }
}
