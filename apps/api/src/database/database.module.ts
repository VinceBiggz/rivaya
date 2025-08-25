import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { DatabaseHealthIndicator } from './database.health';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        prismaOptions: {
          log: configService.get('app.nodeEnv') === 'development' ? ['query', 'error', 'warn'] : ['error'],
          datasources: {
            db: {
              url: configService.get('database.url'),
            },
          },
        },
        explicitConnect: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseHealthIndicator],
  exports: [DatabaseHealthIndicator],
})
export class DatabaseModule {}
