import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectConfigType } from "../config/config.type";

export const MongoModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService<ProjectConfigType>) => ({
    uri: config.get('MONGO_URL'),
  }),
});
