require('dotenv').load()

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('cookie-session');

// const userRoutes = require(“./routes/users”);

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("__method"));
app.use(morgan('dev'));
app.set('view engine', 'pug');

app.disable('x-powered-by');

// app.use(session({secret: preocess.env.SECRET})

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

//LOGIN static page
app.get('/login', function(req, res) {
  res.render('login');
});

//PAYMENT static page
app.get('/payment', function(req, res) {
  res.render('payment');
});

//404 ERROR page (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.render('404');
});

app.listen(3000, () => {
console.log("Server running, port 3000...")
})

module.exports = { app };