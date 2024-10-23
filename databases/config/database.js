import pg from 'pg'

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
    define: {
      timestamps: true,
      freezeTableName: true
    },
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
    define: {
      timestamps: true,
      freezeTableName: true
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
    define: {
      timestamps: true,
      freezeTableName: true
    },
    logging: false
  },
};
