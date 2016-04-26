
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('hours').del(), 

    // Inserts seed entries
    knex('hours').insert({venue_id: 1, dayOfWeek: 6, opening: '22:00:00', closing: '02:00:00'}),
    knex('hours').insert({venue_id: 1, dayOfWeek: 7, opening: '22:00:00', closing: '02:00:00'}),
    knex('hours').insert({venue_id: 2, dayOfWeek: 5, opening: '21:00:00', closing: '02:00:00'}),
    knex('hours').insert({venue_id: 2, dayOfWeek: 6, opening: '21:00:00', closing: '02:00:00'}),
    knex('hours').insert({venue_id: 2, dayOfWeek: 7, opening: '21:00:00', closing: '02:00:00'}),
    knex('hours').insert({venue_id: 3, dayOfWeek: 6, opening: '22:00:00', closing: '03:00:00'}),
    knex('hours').insert({venue_id: 3, dayOfWeek: 7, opening: '22:00:00', closing: '03:00:00'}),
  
  );
};
