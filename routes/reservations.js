const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const helpers = require('../helpers/authHelpers');

require('locus')

router.use(helpers.currentUser);
router.use(helpers.ensureAuth);


//INDEX
router.get('/', (req, res) => {
	eval(locus)
	//  knex('reservations').where('user_id', req.user.id).then((reservations) => {
	// 	res.render('reservations/index', {reservations});
	// });
});

//NEW
router.get('/new', (req, res) => {
	knex('tables').where({id: req.params.table_id}).first().then(table=>{
		knex('venues').where({id: req.params.venue_id}).first().then(venue=>{
			knex('reservations').where({table_id: req.params.table_id}).then(reservations=>{
				// eval(locus)
				var seatsTaken = reservations.reduce((start, next)=>{
					// eval(locus)
					return start += next.seats

				}, 0);
				
				var seatsAvailable = table.maxCapacity - seatsTaken;
				res.render('reservations/new', {venue, table, seatsTaken, seatsAvailable});
			})
		})
	})
});

//SHOW
router.get('/:id', (req, res) => {
	knex('reservations').where('table_id', req.params.table_id).first().then((reservation)=>{
		res.render('reservations/show', {reservation})
	});
});




//EDIT
router.get('/:id/edit', (req, res) => {
	knex('reservations').where('id', req.params.id).first().then((reservation)=>{
		// eval(locus)
		res.render('reservations/edit', {reservation});
	});
});

//POST
router.post('/', (req, res) => {
	eval(locus)
	knex('reservations').insert({
		table_id: +req.params.table_id,
		// date: ,
		// user_id: ,
		pledge: req.body.reservation.pledge,
		seats: +req.body.reservation.seats 
	}).then(()=>{
		req.flash('newReservation', 'Added New reservation!');
		res.redirect('/reservations');
	});
});


//PUT
router.put('/:id', (req, res) => {
	knex('reservations').where('id', req.params.id).update({reservationname: req.body.reservation.reservationname, password: hash}).then(()=>{
		res.redirect('/reservations');
	});
});



//DELETE
router.delete('/:id', (req, res) => {
	knex('reservations').del().where('id', req.params.id).then(()=>{
		res.redirect('/reservations');
	});
});


module.exports = router