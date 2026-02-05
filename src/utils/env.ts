type AppEnv = "development" | "staging" | "production";

export const APP_ENV = process.env.APP_ENV as AppEnv;

const BASE_API_MAP: Record<AppEnv, string | undefined> = {
  development: process.env.BASE_API_DEVELOPMENT,
  staging: process.env.BASE_API_STAGING,
  production: process.env.BASE_API_PRODUCTION,
};

export const BASE_API = BASE_API_MAP[APP_ENV];
