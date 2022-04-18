export enum ConfigModeTypeEnum {
  DEV = 'dev',
  PROD = 'prod',
  TEST = 'test',
}

export type ProjectConfigType = {
  MODE: ConfigModeTypeEnum;
  PG_HOST: string;
  PG_PORT: number;
  PG_USER: string;
  PG_PASS: string;
  PG_DB: string;
  PG_URL: string;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends Omit<ProjectConfigType, 'PG_PORT'> {
      PG_PORT: string;
    }
  }
}
