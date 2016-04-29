const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const helpers = require('../helpers/authHelpers');
const moment = require('moment')

require('locus')


router.use(helpers.ensureAuth);
router.use(helpers.currentUserVenueTableReservation);


//INDEX
router.get('/', (req, res) => {
	// eval(locus)
	 knex('tables').where({id: req.params.table_id}).first().then(table=>{
		knex('venues').where({id: req.params.venue_id}).first().then(venue=>{
				knex('reservations').where('user_id', req.user.id).then((reservations) => {
						res.render('reservations/index', {venue, table, reservations, message: req.flash('newReservation')});
			})
		})
	});
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
	// eval(locus)
	knex('reservations').insert({
		table_id: +req.params.table_id,
		user_id: +req.user.id,
		pledge: +req.body.reservation.pledge,
		seats: +req.body.reservation.seats,
		created_at: moment(now).format('MM DD YY')
	}).then(()=>{

		knex('reservations').where('table_id', req.params.table_id).then(reservations=>{
			knex('tables').where('id', req.params.table_id).first().then(table=>{

				var peopleAtTable = reservations.reduce((start, next)=>{
					return start += next.seats;
				}, 0);
				// eval(locus)
				if (peopleAtTable === table.maxCapacity) {
					knex('tables').where('id', req.params.table_id).update({status: 'closed'}).then(()=>{
						req.flash('newReservation', 'Added New reservation!');
						res.redirect(`/venues/${req.params.venue_id}/tables/`);
					});
				}
			})

		})
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