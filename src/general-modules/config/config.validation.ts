import { plainToInstance, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { ConfigModeTypeEnum, ProjectConfigType } from './config.type';

class EnviromentVariables implements ProjectConfigType {
  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;
  
  @IsEnum(ConfigModeTypeEnum)
  MODE: ConfigModeTypeEnum;

  @IsString()
  @IsNotEmpty()
  PG_HOST: string;

  @IsNumber()
  @Type(() => Number)
  PG_PORT: number;

  @IsString()
  @IsNotEmpty()
  PG_USER: string;

  @IsString()
  @IsNotEmpty()
  PG_PASS: string;

  @IsString()
  @IsNotEmpty()
  PG_DB: string;

  @IsString()
  @IsNotEmpty()
  PG_URL: string;

  @IsString()
  @IsNotEmpty()
  MONGO_DB: string;

  @IsString()
  @IsNotEmpty()
  MONGO_HOST: string;

  @IsString()
  @IsNotEmpty()
  MONGO_PASS: string;

  @IsNumber()
  @Type(() => Number)
  MONGO_PORT: number;

  @IsString()
  @IsNotEmpty()
  MONGO_URL: string;

  @IsString()
  @IsNotEmpty()
  MONGO_USER: string;

  @IsString()
  @IsNotEmpty()
  SALT_USER_PASS: string;
}

export function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnviromentVariables, config, {
    enableImplicitConversion: false,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    forbidUnknownValues: true,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
