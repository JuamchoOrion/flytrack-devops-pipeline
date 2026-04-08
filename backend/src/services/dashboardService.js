import flightRepository from '../repositories/flightRepository.js';
import notificationRepository from '../repositories/notificationRepository.js';
import baggageRepository from '../repositories/baggageRepository.js';

class DashboardService {
    async getStatistics() {
        try {
            const totalFlights = flightRepository.findAll().length;
            const delayedFlights = flightRepository.countByStatus('delayed');
            const boardingFlights = flightRepository.countByStatus('boarding');
            const onTimeFlights = flightRepository.countByStatus('on-time');
            const cancelledFlights = flightRepository.countByStatus('cancelled');

            const recentNotifications = notificationRepository.getRecent(5);
            const recentBaggageReports = baggageRepository.getRecent(5);

            const pendingReports = baggageRepository.countByStatus('pending');
            const resolvedReports = baggageRepository.countByStatus('resolved');

            return {
                success: true,
                data: {
                    flights: {
                        total: totalFlights,
                        delayed: delayedFlights,
                        boarding: boardingFlights,
                        onTime: onTimeFlights,
                        cancelled: cancelledFlights
                    },
                    notifications: {
                        recent: recentNotifications,
                        total: recentNotifications.length
                    },
                    baggage: {
                        pending: pendingReports,
                        resolved: resolvedReports,
                        recent: recentBaggageReports
                    }
                }
            };
        } catch (error) {
            throw new Error(`Error al obtener estadísticas: ${error.message}`);
        }
    }
}

export default new DashboardService();