const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const bookingRoutes = require('./routes/bookingRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const app = express();

app.use(helmet());
app.set('trust proxy', 1);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
const CORS_ORIGINS = (process.env.CORS_ORIGINS || 'http://localhost:5173').split(',').map(s => s.trim());
app.use(cors({
	origin: (origin, callback) => {
		if (!origin) return callback(null, true);
		if (CORS_ORIGINS.includes(origin)) return callback(null, true);
		return callback(new Error('Not allowed by CORS'));
	},
	credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'bookingService' }));
app.use('/bookings', bookingRoutes);
app.use(notFound);
app.use(errorHandler);
module.exports = app;
