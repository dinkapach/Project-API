import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import index from './routes/index';
import users from './routes/users';
import dashboard from './routes/dashboard';
import club from './routes/club';
import manager from './routes/manager';

// const uri = "mongodb://localhost:27017/project";
const uri = "mongodb://allin:a1b2c3d4@ds059306.mlab.com:59306/all-in";
mongoose.connect(uri, { config: { autoIndex: false } });

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/index', index);
app.use('/api/users', users);
app.use('/api/dashboard', dashboard);
app.use('/api/club', club);
app.use('/api/manager', manager);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(`There has been an unhandled exception error: ${err}`);
  res.status(err.status || 500).end();
});

export default app;
