import notificationRepository from '../repositories/notificationRepository.js';
import flightRepository from '../repositories/flightRepository.js';

class NotificationService {
    async getAllNotifications(limit) {
        try {
            const notifications = notificationRepository.findAll(limit);
            return {
                success: true,
                data: notifications,
                count: notifications.length
            };
        } catch (error) {
            throw new Error(`Error al obtener notificaciones: ${error.message}`);
        }
    }

    async getNotificationById(id) {
        try {
            const notification = notificationRepository.findById(id);

            if (!notification) {
                return {
                    success: false,
                    message: 'Notificación no encontrada'
                };
            }

            return {
                success: true,
                data: notification
            };
        } catch (error) {
            throw new Error(`Error al obtener notificación: ${error.message}`);
        }
    }

    async createNotification(notificationData) {
        try {
            // Validar que el vuelo existe
            const flight = flightRepository.findById(notificationData.flight_id);
            if (!flight) {
                return {
                    success: false,
                    message: 'El vuelo especificado no existe'
                };
            }

            const notification = notificationRepository.create(notificationData);

            return {
                success: true,
                data: notification,
                message: 'Notificación creada exitosamente'
            };
        } catch (error) {
            throw new Error(`Error al crear notificación: ${error.message}`);
        }
    }
}

export default new NotificationService();