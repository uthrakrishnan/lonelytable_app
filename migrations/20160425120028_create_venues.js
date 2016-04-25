
exports.up = function(knex, Promise) {
  return knex.schema.createTable('venues', table=>{
    table.increments(),
    table.text('name'),
    table.text('street_address'),
    table.text('city'),
    table.integer('zipcode'),
    table.text('pic1'),
    table.text('pic2'),
    table.text('pic3'),
    table.text('tableMapPic'),
    table.text('description')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('venues')
};
