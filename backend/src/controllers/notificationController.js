import notificationService from '../services/notificationService.js';

export async function getAllNotifications(req, res, next) {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 50;
        const result = await notificationService.getAllNotifications(limit);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function getNotificationById(req, res, next) {
    try {
        const { id } = req.params;
        const result = await notificationService.getNotificationById(parseInt(id));

        if (!result.success) {
            return res.status(404).json(result);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function createNotification(req, res, next) {
    try {
        const result = await notificationService.createNotification(req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}