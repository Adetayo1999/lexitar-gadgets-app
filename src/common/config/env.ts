export const ENV = Object.freeze({
  PORT: process.env.PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  MAIL_TOKEN_SECRET: process.env.MAIL_TOKEN_SECRET,
  POSTMARK_TOKEN: process.env.POSTMARK_TOKEN,
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
});
