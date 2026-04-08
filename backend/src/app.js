import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import flightRoutes from './routes/flightRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import baggageRoutes from './routes/baggageRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware (solo en desarrollo)
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'flytrack-backend'
    });
});

// API Routes
app.use('/api/flights', flightRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/baggage', baggageRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado',
        path: req.path
    });
});

// Error Handler
app.use(errorHandler);

// Iniciar servidor solo si no estamos en tests
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 FlyTrack Backend Server running on port ${PORT}`);
        console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🗄️  Database: ${process.env.DATABASE_PATH || './flytrack.db'}`);
    });
}

export default app;