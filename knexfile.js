// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'lonelytable_app'
    },
    debug: true
  },
  production: {
    client: 'postgresql',
    connection: process.env.HEROKU_POSTGRESQL_ONYX_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
