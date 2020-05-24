const mongoose = require('mongoose');

const { Types } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
		},
		description: {
			type: String,
			required: true,
			maxlength: 2000,
		},
		price: {
			type: Number,
			trim: true,
			required: true,
		},
		category: {
			type: Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		user: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		status: {
			type: Number,
			default: 1,
		},
		quantity: {
			type: Number,
			default: 0,
		},
		image: {
			type: String,
			required: true,
		},
		shipping: {
			type: Boolean,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
