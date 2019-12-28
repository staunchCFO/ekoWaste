//! A basic todo list application using MERN . 
//! Design and Development of the Node powered server 
//! Require important dependencies 
const express = require('express') 
const logger  = require('morgan') 
const path    = require('path')
const cookieParser = require('cookie-parser')
const createError  = require('http-errors') 

const  indexRouter = require('./routes/index');
//!const  usersRouter = require('./routes/users');
const appRouter = require('./routes/bigjara') 

const app = express();

//! view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//!Middleware 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
//! Configure sending of static files 
app.use(express.static(path.join(__dirname, 'public')));

//! Set up the application routes 
app.use('/', appRouter);
//!app.use('/users', usersRouter);
const options = {
	useNewUrlParser : true
}
//! Connect to the database 
let mongoose = require('mongoose') 
mongoose.connect('mongodb://127.0.0.1/firstdb' , options) 
	
let db = mongoose.connection 
db.on('error' , console.error.bind(console , 'MongoDB connection error'))
db.on('open' , console.info.bind(console , 'Connection was ok'))

//! catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//! error handler
app.use(function(err, req, res, next) {
  //! set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //! render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*!app.get('/' , (req , res) => {
	res.json({name : 'Hello World'})
})
app.get('search' , (req , res)=> { 
  res.status(200)
  let val = req.query.name 
  res.send(val)
})
*/


module.exports = app;

