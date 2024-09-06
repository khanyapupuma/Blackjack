import express from 'express';
import usersRouter from './router/usersRouter.js';
import productsRouter from './router/productsRouter.js';
import cors from 'cors';

const app = express();
let port = +process.env.PORT || 5005;

app.use(cors({
  origin: '*',
  credentials: true,
  methods: '*',
  allowedHeaders: '*',
  exposedHeaders: ['Authorization']
}));

app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});