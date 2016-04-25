const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const helpers = require('../helpers/authHelpers');



router.use(helpers.currentUser);


//INDEX
router.get('/', (req, res) => {
	 knex('venues').then((venues) => {
		res.render('venues/index', {
			venues, 
			message: req.flash('loginMessage')
		});
	});
});


//SHOW
router.get('/:id', (req, res) => {
	knex('venues').where('id', req.params.id).first().then((venue) =>{
		res.render('venues/show', {venue});
	});
});

module.exports = router