import baggageService from '../services/baggageService.js';

export async function getAllReports(req, res, next) {
    try {
        const result = await baggageService.getAllReports();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function getReportById(req, res, next) {
    try {
        const { id } = req.params;
        const result = await baggageService.getReportById(parseInt(id));

        if (!result.success) {
            return res.status(404).json(result);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function createReport(req, res, next) {
    try {
        const result = await baggageService.createReport(req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export async function updateReportStatus(req, res, next) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const result = await baggageService.updateReportStatus(parseInt(id), status);

        if (!result.success) {
            return res.status(404).json(result);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
}