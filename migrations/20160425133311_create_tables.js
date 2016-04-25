
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tables', t=>{
    t.increments(),
    t.integer('venue_id').unsigned().index().references('venues.id').notnullable(),
    t.text('table_name'),
    t.integer('cost'),
    t.integer('maxCapacity'),
    t.text('description'),
    t.text('pic1'),
    t.text('table_status')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tables');
};
