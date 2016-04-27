require('dotenv').load()

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('cookie-session');
const routes = require('./routes/index');


app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'jade');

app.disable('x-powered-by');

app.use(session({secret: process.env.SECRET}));

app.use('/auth', routes.auth)
app.use('/venues', routes.venues)
app.use('/tables', routes.tables)
app.use('/tables/:table_id/reservations', routes.reservations)

//HOME static page
app.get("/", function(req, res){
  res.render('index');
});

//ABOUT static page
app.get("/about", function(req, res){
  res.render('about');
});

//CONTACT static page
app.get('/contact', function(req, res) {
  res.render('contact');
});

//GETTING STARTED static page
app.get('/getstarted', function(req, res) {
  res.render('getstarted');
});

//LOGIN static page
app.get('/login', function(req, res) {
  res.redirect('/auth/facebook');
});

//PAYMENT static page
// app.get('/payment', function(req, res) {
//   res.render('payment');
// });

//404 ERROR page (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.render('404');
});

app.listen(3000, () => {
console.log("Server running, port 3000...")
})

module.exports = { app };