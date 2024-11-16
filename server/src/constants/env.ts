const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) throw new Error(`Missing environment variable ${key}`);

  return value;
};

export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "4004");
export const MONGO_URI = getEnv("MONGO_URI");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const FRONTEND_URL = getEnv("FRONTEND_URL");
