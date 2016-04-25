
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table=>{
    table.increments(),
    table.text('username').unique(),
    table.text('password'),
    table.text('alias'),
    table.text('profile_pic'),
    table.date('dob'),
    table.text('blurb')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
