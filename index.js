const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

// App
const app = express();

// Setup cors
app.use(cors());

// Setup static
app.use('/static/uploads/images', express.static(path.join('static', 'upload', 'image')));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// Router Middleware
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    throw err;
  });

// Router
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

app.use((err, req, res, next) => {
  const message = err.message || 'Something went wrong';
  const status = err.status || 500;
  const { data } = err;

  res.status(status).json({
    message,
    data,
  });
});

const port = process.env.PORT || 8000;

app.listen(port);
