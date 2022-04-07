declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MODE: 'dev' | 'prod',
      PG_DB: string,
    }
  }
}

export { };
