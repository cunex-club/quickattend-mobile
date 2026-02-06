type AppEnv = "development" | "staging" | "production";

export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV as AppEnv;

const BASE_API_MAP: Record<AppEnv, string | undefined> = {
  development: process.env.NEXT_PUBLIC_BASE_API_DEVELOPMENT,
  staging: process.env.NEXT_PUBLIC_BASE_API_STAGING,
  production: process.env.NEXT_PUBLIC_BASE_API_PRODUCTION,
};

export const BASE_API = BASE_API_MAP[APP_ENV];
