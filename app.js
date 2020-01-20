
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import auth from './routes/usersRoute';
import express from 'express';
const app = express();
dotenv.config({ path: './.env' });

mongoose.connect('mongodb://localhost/userInfo')
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use('/', auth);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
