
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('venues').del(), 

    // Inserts seed entries
    knex('venues').insert({id: 1, name: 'Origin SF', street_address: '1538 Fillmore St', city: 'San Francisco' , zipcode: '94115' , pic1:  , pic2:  , pic3:  , tableMapPic:  , description: }),
    knex('venues').insert({id: 2, name: 'rowValue2', street_address: , city: , zipcode:  , pic1:  , pic2:  , pic3:  , tableMapPic:  , description: }),
    knex('venues').insert({id: 3, name: 'rowValue3', street_address: , city: , zipcode:  , pic1:  , pic2:  , pic3:  , tableMapPic:  , description: })
  );
};
