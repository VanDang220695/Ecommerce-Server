const multer = require('multer');
const uuid = require('uuid');
const { MIME_TYPE_MAP } = require('../helpers/constants');

const fileUpload = (storage) =>
	multer({
		limits: 100000, // 1mb
		storage: multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, `uploads/images/${storage}`);
			},
			filename: (req, file, cb) => {
				const ext = MIME_TYPE_MAP[file.mimetype];
				cb(null, `${uuid.v1()}.${ext}`);
			},
		}),
		fileFilter: (req, file, cb) => {
			let error = null;
			if (!MIME_TYPE_MAP[file.mimetype]) {
				error = new Error(
					'Invalid file. Just Accept file image jpg, jpeg and png',
				);
			}
			cb(error, !error);
		},
	});

module.exports = fileUpload;
