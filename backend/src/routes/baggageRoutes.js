import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validator.js';
import * as baggageController from '../controllers/baggageController.js';

const router = express.Router();

// GET /api/baggage - Listar reportes
router.get('/', baggageController.getAllReports);

// GET /api/baggage/:id - Obtener reporte por ID
router.get('/:id', baggageController.getReportById);

// POST /api/baggage - Crear reporte
router.post('/',
    [
        body('passenger_name').trim().notEmpty().withMessage('Nombre del pasajero requerido'),
        body('passenger_id').trim().notEmpty().withMessage('Documento del pasajero requerido'),
        body('flight_number').trim().notEmpty().withMessage('Número de vuelo requerido'),
        body('issue_type').isIn(['lost', 'damaged', 'delayed', 'other']).withMessage('Tipo de inconveniente inválido'),
        body('description').trim().notEmpty().withMessage('Descripción requerida'),
        body('contact').trim().notEmpty().isEmail().withMessage('Email de contacto inválido'),
        validate
    ],
    baggageController.createReport
);

// PUT /api/baggage/:id/status - Actualizar estado de reporte
router.put('/:id/status',
    [
        body('status').isIn(['pending', 'in-progress', 'resolved', 'rejected']).withMessage('Estado inválido'),
        validate
    ],
    baggageController.updateReportStatus
);

export default router;