const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

require('dotenv').config();

const { HTTP_CODE } = require('./constants');

// App
const app = express();

// Setup cors
app.use(cors());

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Setup static
app.use('/uploads/images', express.static(path.join('upload', 'images')));
// Router Middleware
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// DB
mongoose
	.connect(process.env.DATABASE_MONGO_CLOUD, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	})
	.catch((err) => {
		throw err;
	});

// Router
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

// Handle error API not found
app.use((req, res, next) => {
	res.status(404).json({ msg: 'API not found' });
});

app.use((err, req, res, next) => {
	if (req.file) {
		fs.unlink(req.file.path, (error) => {
			if (error) {
				console.log(error);
			}
		});
	}

	const status = err.status || 500;
	const message = err.message || HTTP_CODE[`CODE_${status}`];

	const { data } = err;

	res.status(status).json({
		message,
		data,
	});
});

const port = process.env.PORT || 8000;

app.listen(port);
