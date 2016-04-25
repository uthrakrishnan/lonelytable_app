const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const helpers = require('../helpers/authHelpers');



router.use(helpers.currentUser);
router.use(helpers.ensureAuth);


//INDEX
router.get('/', (req, res) => {
	 knex('users').then((users) => {
		res.render('users/index', {
			users, 
			message: req.flash('loginMessage')
		});
	});
});



//NEW
router.get('/new', (req, res) => {
	res.render('users/new');
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



//POST
router.post('/', (req, res) => {
	bcrypt.genSalt(SALT_WORK_FACTOR, (err,salt)=>{
		bcrypt.hash(req.body.user.password, salt, (err, hash)=>{
			knex('users').insert({username: req.body.user.username, password: hash}).then(()=>{
				req.flash('newUser', 'Added New User!');
				res.redirect('/users');
			});
		});
	});
});


//PUT
router.put('/:id', (req, res) => {
	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=>{
		bcrypt.hash(req.body.user.password, salt, (err, hash)=> {
			knex('users').where('id', req.params.id).update({username: req.body.user.username, password: hash}).then(()=>{
				res.redirect('/users');
			});
		});
	});
});


//DELETE
router.delete('/:id', (req, res) => {
	knex('users').del().where('id', req.params.id).then(()=>{
		res.redirect('/users');
	});
});


module.exports = router