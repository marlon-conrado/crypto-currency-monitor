import dotenv from 'dotenv';

dotenv.config();

export const environment = {
  port: process.env.PORT || 8080,
  db: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    name: process.env.DB_NAME || 'dbname',
    userName: process.env.DB_USER_NAME || 'username',
    password: process.env.DB_PASS || '123',
    port: 5432,
  },
  isDevelopment: process.env.NODE_ENV === 'development',
  saltRounds: 10,
};
