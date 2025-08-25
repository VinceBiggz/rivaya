import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';

// Core Modules
import { PrismaModule } from './core/database/prisma.module';

// Feature Modules
import { AuthModule } from '@/modules/auth/auth.module';

// App-specific
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validationSchema } from '@/config/validation';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validationSchema,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    TerminusModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
