import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const app = express();

mongoose.connect(process.env.MONGO).then(() => {
  console.log(`DB connection Successfull 🎉`);
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
