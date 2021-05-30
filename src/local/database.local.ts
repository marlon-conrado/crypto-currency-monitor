import { Sequelize, Dialect } from 'sequelize';
import { environment } from '../shared';

const sequelize = new Sequelize(
  environment.db.name,
  environment.db.userName,
  environment.db.password,
  {
    host: environment.db.host,
    dialect: environment.db.dialect as Dialect,
    port: environment.db.port,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

export const database = sequelize;
