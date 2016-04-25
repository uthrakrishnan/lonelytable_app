const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const helpers = require('../helpers/authHelpers');



router.use(helpers.currentUser);
router.use(helpers.ensureAuth);


//INDEX
router.get('/', (req, res) => {
	 knex('reservations').then((reservations) => {
		res.render('reservations/index', {
			reservations, 
			message: req.flash('loginMessage')
		});
	});
});


//SHOW
router.get('/:id', (req, res) => {
	knex('reservations').where('id', req.params.id).first().then((user)=>{
		res.render('reservations/show', {user})
	});
});


//NEW
router.get('/new', (req, res) => {
	res.render('reservations/new');
});


//EDIT
router.get('/:id/edit', (req, res) => {
	knex('reservations').where('id', req.params.id).first().then((user)=>{
		// eval(locus)
		res.render('reservations/edit', {user});
	});
});

//POST
router.post('/', (req, res) => {
	knex('reservations').insert({username: req.body.user.username, password: hash}).then(()=>{
		req.flash('newUser', 'Added New User!');
		res.redirect('/reservations');
	});
});


//PUT
router.put('/:id', (req, res) => {
	knex('reservations').where('id', req.params.id).update({username: req.body.user.username, password: hash}).then(()=>{
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