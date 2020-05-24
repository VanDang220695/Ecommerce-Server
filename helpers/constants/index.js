const MIME_TYPE_MAP = {
	'image/png': 'png',
	'image/jpeg': 'jpeg',
	'image/jpg': 'jpg',
};

const HTTP_CODE = {
	CODE_400:
		'Client specified an invalid argument. Check error message and error details for more information.',
	CODE_401:
		'Request not authenticated due to missing, invalid, or expired OAuth token.',
	CODE_403: 'Client does not have sufficient permission.',
	CODE_404:
		'A specified resource is not found, or the request is rejected by undisclosed reasons, such as whitelisting.',
	CODE_409: 'The resource that a client tried to create already exists.',
	CODE_500: 'Internal server error. Typically a server bug.',
};

module.exports = {
	MIME_TYPE_MAP,
	HTTP_CODE,
};
