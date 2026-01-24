import * as dotenv from "dotenv";

dotenv.config();

interface IEnvVarriable {
  HOST: string;
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  FRONTEND_URL: string;
  NODEMAILER_EMAIL_PASSWORD: string;
  NODEMAILER_EMAIL: string;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES: string;
  JWT_INVITATION_SECRET: string;
  JWT_INVITATION_EXPIRES: string;
  BCRYPT_SALT_ROUND: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
}

const loadEnvVariables = (): IEnvVarriable => {
  const requiredEnvVarriables: string[] = [
    "HOST",
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "FRONTEND_URL",
    "NODEMAILER_EMAIL_PASSWORD",
    "NODEMAILER_EMAIL",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRES",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES",
    "JWT_INVITATION_SECRET",
    "JWT_INVITATION_EXPIRES",
    "BCRYPT_SALT_ROUND",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
  ];
  requiredEnvVarriables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
  return {
    HOST: process.env.HOST as string,
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    NODEMAILER_EMAIL_PASSWORD: process.env.NODEMAILER_EMAIL_PASSWORD as string,
    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    JWT_INVITATION_SECRET: process.env.JWT_INVITATION_SECRET as string,
    JWT_INVITATION_EXPIRES: process.env.JWT_INVITATION_EXPIRES as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
  };
};

export const envVars = loadEnvVariables();
