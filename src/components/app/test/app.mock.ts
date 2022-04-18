import { Module } from '@nestjs/common';
import { MockConfigModule } from '../../../general-modules/config/test/config.mock';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

@Module({
  imports: [MockConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class TestAppModule {}
