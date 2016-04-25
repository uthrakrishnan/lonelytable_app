const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const helpers = require('../helpers/authHelpers');



router.use(helpers.currentUser);


//INDEX
router.get('/', (req, res) => {
	 knex('tables').then((tables) => {
		res.render('tables/index', {tables});
	});
});


//SHOW
router.get('/:id', (req, res) => {
	knex('tables').where('id', req.params.id).first().then((table) =>{
		res.render('tables/show', {table});
	});
});

//EDIT
router.get('/:id/edit', (req, res) => {
	knex('tables').where('id', req.params.id).first().then((table)=>{
		// eval(locus)
		res.render('tables/edit', {table});
	});
});


//PUT
router.put('/:id', (req, res) => {
	knex('tables').where('id', req.params.id).update({username: req.body.user.username, password: hash}).then(()=>{
		res.redirect('/tables');
	});
});


module.exports = router