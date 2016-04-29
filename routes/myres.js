const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const helpers = require('../helpers/authHelpers');
const moment = require('moment')

require('locus')


router.use(helpers.ensureAuth);
router.use(helpers.currentUserVenueTableReservation);


router.get('/', (req, res)=>{
	knex('reservations').where('user_id', req.user.id).then(reservations=>{
		knex('tables').where('id', reservations[0].table_id).first().then(table=>{
			knex('venues').where('id', table.venue_id).first().then(venue=>{
				res.render('myres/index', {venue, table, reservations, count: [1,2,3,4,5]})
			})
		})
	})
})


module.exports = router