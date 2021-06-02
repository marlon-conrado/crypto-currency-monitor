import dotenv from 'dotenv';

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';

export const environment = {
  port: process.env.PORT || 8080,
  db: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    name: process.env.DB_NAME || 'dbname',
    userName: process.env.DB_USER_NAME || 'username',
    password: process.env.DB_PASS || '123',
    port: Number(process.env.DB_PORT) || 5432,
  },
  isDevelopment: nodeEnv === 'development',
  isTest: nodeEnv === 'test',
  saltRounds: 10,
  token: {
    privateKey: process.env.TOKEN_PRIVATE_KEY || 'M123456',
    expiresIn: process.env.TOKEN_EXPIRE_IN || '1h',
  },
  endpoints: {
    coingecko: {
      base:
        process.env.COINGECKO_ENDPOINT_BASE_URL ||
        'https://api.coingecko.com/api/v3',
      methods: {
        coinsMarkets: 'coins/markets?vs_currency={q.vsCurrency}',
        coin: 'coins/{q.coinId}?tickers={q.tickers}&market_data={q.marketData}&community_data={q.communityData}&developer_data={q.developerData}&sparkline={q.sparkLine}',
      },
    },
  },
};
