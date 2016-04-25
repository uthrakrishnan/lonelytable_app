
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reservations', t=>{
    t.increments(),
    t.integer('table_id').unsigned().index().references('tables.id'),
    t.date('date'),
    t.integer('user_id').unsigned().index().references('users.id'),
    t.integer('pledge')
    t.text('partyType')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reservations')
};
