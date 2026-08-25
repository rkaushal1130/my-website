import { Request, Response } from 'express';
import { HealthService } from '../services/health.service';

export class HealthController {
  public static getHealth(req: Request, res: Response) {
    const details = HealthService.getHealthStatus();

    // Meets exact requirement: { "success": true, "message": "NeverQuit.ai API is running" }
    return res.status(200).json({
      success: true,
      message: 'NeverQuit.ai API is running',
      ...details,
    });
  }
}
