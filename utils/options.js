const baseUrl = process.env.SERVER_URL;
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Myechelon - Abasare',
			version: '1.0.0',
			description:
				'Abasare backend project for Mychelon.',
		},
		servers: [
			{
				url: baseUrl || `http://localhost:7000`,
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					in: 'header',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ['./routes/**/*.js'],
};

export default options;
