const swaggerJsdoc = require('swagger-jsdoc');
const registrationSchema = require('./schemas/user-schema');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Dokumentasi API BiGames',
            version: '1.0.0',
            description: 'Ini adalah dokumentasi dari API BiGames'
        },
        servers: [
            { url: "http://localhost:3000" },
            { url: "http://localhost:3000" }
        ],
        tags: [
            {
                name: "Authentication",
                description: "lorem"
            }
        ],
        components: {
            schemas: {
                Registration: registrationSchema
            },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ['./routes/*.js'] // lokasi endpoint Anda
};

const specs = swaggerJsdoc(options);

module.exports = specs;
