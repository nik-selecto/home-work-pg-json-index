import { ConfigModule } from '@nestjs/config';

export const MockConfigModule = ConfigModule.forRoot({
  ignoreEnvFile: true,
  load: [() => ({ MODE: 'test' })],
});
