require('express-async-errors');
import express from 'express';
import { errorHandler } from './middlewares';
import routes from './routes';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
