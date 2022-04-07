declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MODE: 'dev' | 'prod',
      PG_DB: string,
      PG_USER: string,
      PG_PASS: string,
      DATABASE_URL: string,
    }
  }
}

export { };
