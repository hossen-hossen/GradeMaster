const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const cors = require("cors");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Create Express app
const app = express();

// Middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        credentials: true,
        origin: [
            'http://localhost:8000'
        ],
    }),
);

// Route middleware
app.get('/', (req, res) => {
    res.send('GradeMaster API Server is running!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

sequelize.sync()
    .then(result => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    // Determines whether to fail on errors.
    failOnErrors: true,
    definition: {
        openapi: '3.0.0', // Specifies the OpenAPI version being used.
        info: {
            title: 'GradeMaster API', // Title of your API documentation.
            version: '1.0.0', // Version of your API.
            description: 'API Documentation for GradeMaster Service' // Detailed description of your API.
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer', // The HTTP authentication scheme to be used.
                    bearerFormat: 'JWT' // Format of the bearer token, typically JWT.
                }
            }
        }
    },
    // Path to the API docs.
    apis: ['./routes/*.js']
};

// Initialize swagger-jsdoc with the given options.
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Serve the API docs at /api-docs using swagger-ui-express.
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
