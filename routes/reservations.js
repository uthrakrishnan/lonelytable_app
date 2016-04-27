const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const helpers = require('../helpers/authHelpers');

require('locus')

router.use(helpers.currentUser);
router.use(helpers.ensureAuth);


//INDEX
router.get('/', (req, res) => {
	 knex('reservations').then((reservations) => {
		res.render('reservations/index', {reservations});
	});
});

//NEW
router.get('/new', (req, res) => {
	knex('tables').where({id: req.params.table_id}).first().then(table=>{
		knex('venues').where({id: req.params.venue_id}).first().then(venue=>{
			eval(locus)
			res.render('reservations/new', {table});
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
	knex('reservations').insert({reservationname: req.body.reservation.reservationname, password: hash}).then(()=>{
		req.flash('newreservation', 'Added New reservation!');
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