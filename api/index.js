import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/AppError.js';

dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO).then(() => {
  console.log(`DB connection Successfull 🎉`);
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `The route ${req.originalUrl} does not exist on this server`,
      400
    )
  );
});

app.use(globalErrorHandler);
