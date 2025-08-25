import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import jwtConfig from './jwt.config';
import appConfig from './app.config';

export const configurationModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [databaseConfig, jwtConfig, appConfig],
  envFilePath: ['.env.local', '.env'],
  cache: true,
  expandVariables: true,
});

export * from './database.config';
export * from './jwt.config';
export * from './app.config';
