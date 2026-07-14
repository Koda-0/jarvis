require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors')
const multer = require('multer');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const { urlencoded } = require('body-parser');
const connectDB = require('./config/conn');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
require('./config/passport')(passport);
connectDB();
const app = express();
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
        'https://ishimwesabri-tau.vercel.app'
    ],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

const appRoutes = require('./routes/app.routes');

app.use('/', appRoutes);
app.use('/auth', appRoutes);
app.use('/api', appRoutes);
app.use('/api/auth', appRoutes);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: error.message,
            field: error.field
        });
    }

    return next(error);
});

app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message
    });
});

module.exports = app;
