import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validator.js';
import * as notificationController from '../controllers/notificationController.js';

const router = express.Router();

// GET /api/notifications - Listar notificaciones
router.get('/', notificationController.getAllNotifications);

// GET /api/notifications/:id - Obtener notificación por ID
router.get('/:id', notificationController.getNotificationById);

// POST /api/notifications - Crear notificación
router.post('/',
    [
        body('flight_id').isInt({ min: 1 }).withMessage('ID de vuelo inválido'),
        body('type').trim().notEmpty().withMessage('Tipo de notificación requerido'),
        body('message').trim().notEmpty().withMessage('Mensaje requerido'),
        body('priority').optional().isIn(['low', 'normal', 'high', 'urgent']),
        validate
    ],
    notificationController.createNotification
);

export default router;