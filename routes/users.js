const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const helpers = require('../helpers/authHelpers');



router.use(helpers.currentUser);
// router.use(helpers.ensureAuth);


//INDEX
router.get('/', (req, res) => {
	 knex('users').then((users) => {
		res.render('users/index', {
			users, 
			message: req.flash('loginMessage')
		});
	});
});


//SHOW
router.get('/:id', (req, res) => {

});



//EDIT
router.get('/:id/edit', (req, res) => {
	knex('users').where('id', req.params.id).first().then((user)=>{
		// eval(locus)
		res.render('users/edit', {user});
	});
});


//DELETE
router.delete('/:id', (req, res) => {
	knex('users').del().where('id', req.params.id).then(()=>{
		res.redirect('/users');
	});
});


module.exports = router