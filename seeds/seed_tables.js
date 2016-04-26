
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('tables').del(), 

    // Inserts seed entries
    knex('tables').insert({venue_id: '2', table_name: 'VIP Mezzanine', cost: '$900', maxCapacity: '10', description: 'VIP table on the Mezzanine level', table_status: 'open'}),
    knex('tables').insert({venue_id: '2', table_name: 'Main Floor', cost: '$800', maxCapacity: '10', description: 'Roped off table in the front room.', table_status: 'open'}),
    knex('tables').insert({venue_id: '2', table_name: 'Dance Floor', cost: '$900', maxCapacity: '15', description: 'Roped off table off of the dance floor.', table_status: 'open'}),
    knex('tables').insert({venue_id: '1', table_name: 'G4', cost: '$600', maxCapacity: '8', description: 'Round standing table off the dance floor', table_status: 'open'}),
    knex('tables').insert({venue_id: '1', table_name: 'G5', cost: '$600', maxCapacity: '8', description: 'Round standing table off the dance floor', table_status: 'open'}),
    knex('tables').insert({venue_id: '1', table_name: 'G6', cost: '$600', maxCapacity: '8', description: 'Round standing table off the dance floor', table_status: 'open'})
    
  );
};
