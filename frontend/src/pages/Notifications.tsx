import { useEffect, useState } from 'react';
import { notificationApi } from '../services/api';
import type { Notification } from '../types';
import NotificationCard from '../components/NotificationCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Notifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            setLoading(true);
            const response = await notificationApi.getAll();
            if (response.data.success && response.data.data) {
                setNotifications(response.data.data);
            }
        } catch (err) {
            setError('Error al cargar notificaciones');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filterByPriority = (priority: string) => {
        return notifications.filter(n => n.priority === priority);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Notificaciones</h1>
                <p className="text-gray-600">Alertas y cambios de estado de vuelos</p>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <div className="text-center text-red-600">{error}</div>
            ) : notifications.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No hay notificaciones</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Notificaciones Urgentes */}
                    {filterByPriority('urgent').length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Urgentes</h2>
                            <div className="space-y-3">
                                {filterByPriority('urgent').map((notification) => (
                                    <NotificationCard key={notification.id} notification={notification} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Notificaciones de Alta Prioridad */}
                    {filterByPriority('high').length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Alta Prioridad</h2>
                            <div className="space-y-3">
                                {filterByPriority('high').map((notification) => (
                                    <NotificationCard key={notification.id} notification={notification} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Notificaciones Normales */}
                    {filterByPriority('normal').length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Normales</h2>
                            <div className="space-y-3">
                                {filterByPriority('normal').map((notification) => (
                                    <NotificationCard key={notification.id} notification={notification} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Notificaciones de Baja Prioridad */}
                    {filterByPriority('low').length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Información</h2>
                            <div className="space-y-3">
                                {filterByPriority('low').map((notification) => (
                                    <NotificationCard key={notification.id} notification={notification} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notifications;