
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('hours').del(), 

    // Inserts seed entries
    knex('hours').insert({venue_id: 1, dayOfWeek: '6', opening: '10:00PM', closing: '2:00AM'}),
    knex('hours').insert({venue_id: 1, dayOfWeek: '7', opening: '10:00PM', closing: '2:00AM'}),
    knex('hours').insert({venue_id: 2, dayOfWeek: '5', opening: '09:00PM', closing: '2:00AM'}),
    knex('hours').insert({venue_id: 2, dayOfWeek: '6', opening: '09:00PM', closing: '2:00AM'}),
    knex('hours').insert({venue_id: 2, dayOfWeek: '7', opening: '09:00PM', closing: '2:00AM'}),
    knex('hours').insert({venue_id: 3, dayOfWeek: '6', opening: '10:00PM', closing: '3:00AM'}),
    knex('hours').insert({venue_id: 3, dayOfWeek: '7', opening: '10:00PM', closing: '3:00AM'}),
  
  );
};
