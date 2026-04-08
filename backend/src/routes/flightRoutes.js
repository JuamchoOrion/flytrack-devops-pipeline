import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validator.js';
import * as flightController from '../controllers/flightController.js';

const router = express.Router();

// GET /api/flights - Listar todos los vuelos
router.get('/', flightController.getAllFlights);

// GET /api/flights/search?query=xxx - Buscar vuelos
router.get('/search', flightController.searchFlights);

// GET /api/flights/:id - Obtener vuelo por ID
router.get('/:id', flightController.getFlightById);

// POST /api/flights - Crear nuevo vuelo
router.post('/',
    [
        body('flight_number').trim().notEmpty().withMessage('Número de vuelo requerido'),
        body('airline').trim().notEmpty().withMessage('Aerolínea requerida'),
        body('origin').trim().notEmpty().withMessage('Origen requerido'),
        body('destination').trim().notEmpty().withMessage('Destino requerido'),
        body('departure_time').isISO8601().withMessage('Fecha de salida inválida'),
        body('arrival_time').isISO8601().withMessage('Fecha de llegada inválida'),
        validate
    ],
    flightController.createFlight
);

// PUT /api/flights/:id - Actualizar vuelo
router.put('/:id',
    [
        body('status').optional().isIn(['scheduled', 'delayed', 'boarding', 'departed', 'arrived', 'cancelled', 'on-time']),
        body('gate').optional().trim(),
        validate
    ],
    flightController.updateFlight
);

export default router;