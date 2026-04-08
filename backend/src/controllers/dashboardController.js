import dashboardService from '../services/dashboardService.js';

export async function getStatistics(req, res, next) {
    try {
        const result = await dashboardService.getStatistics();
        res.json(result);
    } catch (error) {
        next(error);
    }
}