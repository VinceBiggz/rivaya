import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class DatabaseHealthIndicator extends HealthIndicator {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      // Test database connection
      await this.prisma.$queryRaw`SELECT 1`;
      
      // Test basic operations
      const userCount = await this.prisma.user.count();
      
      return this.getStatus(key, true, {
        message: 'Database is healthy',
        userCount,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      throw new HealthCheckError(
        'Database health check failed',
        this.getStatus(key, false, {
          message: error.message,
          timestamp: new Date().toISOString(),
        }),
      );
    }
  }

  async ping(key: string): Promise<HealthIndicatorResult> {
    try {
      const start = Date.now();
      await this.prisma.$queryRaw`SELECT 1`;
      const duration = Date.now() - start;
      
      return this.getStatus(key, true, {
        message: 'Database ping successful',
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      throw new HealthCheckError(
        'Database ping failed',
        this.getStatus(key, false, {
          message: error.message,
          timestamp: new Date().toISOString(),
        }),
      );
    }
  }
}
