import hpp from 'hpp';
import cors from 'cors';

import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import AppError from './utils/appError.js';
import userRouter from './routes/userRoutes.js';
import campRouter from './routes/campRoutes.js';
import gearRouter from './routes/gearRouter.js';
import reviewRouter from './routes/reviewRoutes.js';
import globalErrorHandler from './controllers/errorController.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Assuming you're using Express
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.enable('trust proxy');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const corsOptions = {
  credentials: true,
  origin: process.env.FRONT_URL,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!',
// });
// app.use('/api', limiter);

app.post('/webhook-checkout', bodyParser.raw({ type: 'application/json' }));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price',
//     ],
//   })
// );

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/camps', campRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/gears', gearRouter);

//for deploy in Heroku
app.get('/', (req, res) => {
  res.send('server is running');
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
