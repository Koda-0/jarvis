const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SABRI API',
            version: '1.0.0',
            description: 'MY PORTIFOLIO BACKEND API'
        },
        servers: [
            {
                url: 'http://localhost:5120'
            }
        ]
    },
    apis: [path.join(__dirname, '..', 'routes', '*.js').replace(/\\/g, '/')]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
