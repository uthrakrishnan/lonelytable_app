const knex = require('../db/knex');

require('locus')

module.exports = {
	currentUserVenueTableReservation: (req, res, next) => {
		if(!req.isAuthenticated) {
			return next();
		}
		else {
			res.locals.user = req.user;

			knex('tables').where({id: req.params.table_id}).first().then(table=>{
				knex('venues').where({id: req.params.venue_id}).first().then(venue=>{
					knex('reservations').where('user_id', req.user.id).then((reservations) => {
					res.locals.table = table;
					res.locals.venue = venue;
					res.locals.userReservations = reservations;
					})
				})
			});
			// delete res.locals.currentUserVenueTableReservation.password;
			return next();
		}
	},


	ensureAuth: (req, res, next) =>{
		if(req.originalUrl === "/auth/facebook") {
			return next();
		}
		if(req.isAuthenticated()){

			return next();
		}
		else{
			req.flash('loginMessage', 'Please log in');
			res.redirect('/auth/login');
		}
	},

	ensureAuthForP: (req, res, next)=>{
		if(req.user.id === +req.params.user_id) {
			return next();
		}
		else {
			req.flash('loginMessage', 'Cannot update that post');
			res.redirect(`/users/${req.params.user_id}/photos`);
		}

	}

}