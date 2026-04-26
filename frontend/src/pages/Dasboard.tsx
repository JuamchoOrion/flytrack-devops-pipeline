import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dashboardApi } from '../services/api';
import type { DashboardStats } from '../types';
import StatCard from '../components/StatCard';
import NotificationCard from '../components/NotificationCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const response = await dashboardApi.getStats();
            if (response.data.success && response.data.data) {
                setStats(response.data.data);
            }
        } catch (err) {
            setError('Error al cargar estadísticas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-600">{error}</div>;
    if (!stats) return null;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
                <p className="text-gray-600">Resumen de operaciones del aeropuerto</p>
            </div>

            {/* Estadísticas de Vuelos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard
                    title="Total de Vuelos"
                    value={stats.flights.total}
                    icon="✈️"
                    color="blue"
                />
                <StatCard
                    title="A Tiempo"
                    value={stats.flights.onTime}
                    icon="✅"
                    color="green"
                />
                <StatCard
                    title="Retrasados"
                    value={stats.flights.delayed}
                    icon="⏰"
                    color="yellow"
                />
                <StatCard
                    title="Embarcando"
                    value={stats.flights.boarding}
                    icon="🚪"
                    color="blue"
                />
                <StatCard
                    title="Cancelados"
                    value={stats.flights.cancelled}
                    icon="❌"
                    color="red"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Notificaciones Recientes */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Notificaciones Recientes</h2>
                        <Link to="/notifications" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            Ver todas →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {stats.notifications.recent.length > 0 ? (
                            stats.notifications.recent.map((notification) => (
                                <NotificationCard key={notification.id} notification={notification} />
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">No hay notificaciones recientes</p>
                        )}
                    </div>
                </div>

                {/* Reportes de Equipaje */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Reportes de Equipaje</h2>
                        <Link to="/baggage-report" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            Nuevo reporte →
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <StatCard
                            title="Pendientes"
                            value={stats.baggage.pending}
                            icon="📦"
                            color="yellow"
                        />
                        <StatCard
                            title="Resueltos"
                            value={stats.baggage.resolved}
                            icon="✅"
                            color="green"
                        />
                    </div>
                    <div className="card">
                        <h3 className="font-semibold text-gray-700 mb-3">Reportes Recientes</h3>
                        {stats.baggage.recent.length > 0 ? (
                            <div className="space-y-2">
                                {stats.baggage.recent.map((report) => (
                                    <div key={report.id} className="flex items-center justify-between text-sm py-2 border-b last:border-0">
                                        <div>
                                            <p className="font-medium text-gray-800">{report.passenger_name}</p>
                                            <p className="text-gray-500 text-xs">{report.flight_number}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                                    'bg-blue-100 text-blue-800'
                                        }`}>
                      {report.status}
                    </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No hay reportes recientes</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;