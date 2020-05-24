const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		status: {
			type: Number,
			default: 1,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Category', categorySchema);
