
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('reservations', t=>{
    t.integer('seats')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('reservations', t=>{
    t.dropColumn('seats')
  })
};
