import express from 'express';
import * as dashboardController from '../controllers/dashboardController.js';

const router = express.Router();

// GET /api/dashboard/stats - Obtener estadísticas del dashboard
router.get('/stats', dashboardController.getStatistics);

export default router;