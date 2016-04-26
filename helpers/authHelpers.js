const knex = require('../db/knex');

module.exports = {
	currentUser: (req, res, next) => {
		if(!req.isAuthenticated) {
			return next();
		}
		else {
		
			res.locals.currentUser = req.user;
			// delete res.locals.currentUser.password;
			return next();
		}
	},


	ensureAuth: (req, res, next) =>{

		if(req.originalUrl === "/auth/facebook") {
			return next();
		}
		if(req.isAuthenticated){
			return next();
		}
		else{
			req.flash('loginMessage', 'Please log in');
			res.redirect('/auth/facebook');
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