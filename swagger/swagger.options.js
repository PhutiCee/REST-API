const swaggerConfig = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "PhutiCee APIs",
            description: "This is method to API Documentation",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [
        "./routes/*.js",
        "./controllers/*.js"
    ]
};

const swaggerAPIOptions = swaggerConfig(options);
module.exports = swaggerAPIOptions;