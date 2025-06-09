export interface EnvConfig {
    PORT: string;
    JWT_SECRET: string;
    DATABASE_URL: string;
    NODE_ENV: "development" | "production" | "test" | string;
    BCRYPT_SALT_ROUNDS:number;
}