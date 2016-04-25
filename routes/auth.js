const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const helpers = require('../helpers/authHelpers');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new FacebookStrategy({
	clientID: process.env.FACEBOOK_KEY,
	clientSecret: process.env.FACEBOOK_SECRET,
	callbackURL: "http://localhost:4000/auth/facebook/callback",
  	scope: ['email', 'public_profile']
  }, (accessToken, refreshToken, profile, done)=>{
  	knex('users').where('fb_id', profile.id).first().then(user=>{
  		if(user) {
  			return done(null, user);
  		}
  		else {
  			knex('users').insert({fb_id: profile.id, username: profile.displayName}, '*').then(user=>{
  				return done(null, user[0]);
  			});
  		}
  	}).catch(err=>{
  		return done(err, null);
  	});
  }));

passport.serializeUser((user, done)=>{
	done(null, user.id);
});

passport.deserializeUser((id, done)=>{
	knex('users').where('id', id).first().then(user=>{
		done(null, user);
	}).catch(err=>{
		done(err, false);
	});
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/users',
	failureRedirect: '/auth/login',
	failureFlash: "Failed to log in with Facebook",
  	successFlash: "Welcome back!"
}));

router.get('/login', (req, res)=>{
	res.render('auth/login', {message: req.flash('error')});
});


router.get('/logout', (req, res)=>{
	req.logout();
	res.redirect('/auth/login');
});


module.exports = router