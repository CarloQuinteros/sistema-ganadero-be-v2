declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    JWT_EXPIRES: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
