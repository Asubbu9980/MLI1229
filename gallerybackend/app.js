var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors');

const corsOptions ={
  origin:'http://localhost:3001', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imagesRouter=require('./routes/images')


main().catch(err => console.log(err));

async function main() {
  const connectionUrl='mongodb+srv://ganeshboyar:iWJ0qlQ4RFHYW9dz@cluster0.06wx7uf.mongodb.net/gallery?retryWrites=true&w=majority';
  await mongoose.connect(connectionUrl);
  console.log("connected")
  
 }
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));


app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use((req, res, next)=> {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/images',imagesRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
