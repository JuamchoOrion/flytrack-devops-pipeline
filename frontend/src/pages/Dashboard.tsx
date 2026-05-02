import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dashboardApi } from '../services/api';
import type { DashboardStats } from '../types';
import StatCard from '../components/StatCard';
import NotificationCard from '../components/NotificationCard';
import LoadingSpinner from '../components/LoadingSpinner';

const statusBadge = (status: string) => {
    const m: Record<string, string> = {
        pending:     'bg-amber-500/10 text-amber-400 border-amber-500/20',
        resolved:    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'in-progress': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        rejected:    'bg-red-500/10 text-red-400 border-red-500/20',
    };
    const l: Record<string, string> = {
        pending: 'Pendiente', resolved: 'Resuelto', 'in-progress': 'En proceso', rejected: 'Rechazado',
    };
    return { cls: m[status] ?? m.pending, label: l[status] ?? status };
};

const Dashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<string | null>(null);

    useEffect(() => { loadStats(); }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const res = await dashboardApi.getStats();
            if (res.data.success && res.data.data) setStats(res.data.data);
        } catch {
            setError('Error al cargar estadísticas');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    if (error) return (
        <div className="flex items-center justify-center py-24">
            <div className="card text-center px-10 py-8">
                <p className="text-red-400 font-semibold">{error}</p>
                <button onClick={loadStats} className="btn-secondary mt-4 text-sm">Reintentar</button>
            </div>
        </div>
    );

    if (!stats) return null;

    return (
        <div className="space-y-8 animate-fade-in">

            {/* ── Page header ── */}
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-[10px] font-bold text-sky-500/70 uppercase tracking-[0.2em] mb-2">
                        Panel de Control
                    </p>
                    <h1 className="text-[1.75rem] font-bold text-white tracking-tight leading-none">Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-1.5">Operaciones en tiempo real · AeroPuerto Smart V3.0</p>
                </div>
                <button
                    onClick={loadStats}
                    className="btn-secondary text-xs gap-1.5 flex-shrink-0"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Actualizar
                </button>
            </div>

            {/* ── Flight stats ── */}
            <section>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">
                    Estado de Vuelos
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    <StatCard title="Total"      value={stats.flights.total}     icon="✈"  color="blue"   />
                    <StatCard title="A Tiempo"   value={stats.flights.onTime}    icon="✓"  color="green"  />
                    <StatCard title="Retrasados" value={stats.flights.delayed}   icon="⏱"  color="yellow" />
                    <StatCard title="Embarcando" value={stats.flights.boarding}  icon="↗"  color="blue"   />
                    <StatCard title="Cancelados" value={stats.flights.cancelled} icon="✕"  color="red"    />
                </div>
            </section>

            {/* ── Two-column content ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Notifications */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-0.5">Alertas</p>
                            <h2 className="text-[15px] font-bold text-slate-100">Notificaciones Recientes</h2>
                        </div>
                        <Link
                            to="/notifications"
                            className="flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
                        >
                            Ver todas
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                    <div className="space-y-2">
                        {stats.notifications.recent.length > 0
                            ? stats.notifications.recent.map(n => (
                                <NotificationCard key={n.id} notification={n} />
                              ))
                            : (
                                <div className="card text-center py-10">
                                    <p className="text-slate-600 text-sm">Sin notificaciones recientes</p>
                                </div>
                              )
                        }
                    </div>
                </section>

                {/* Baggage */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-0.5">Equipaje</p>
                            <h2 className="text-[15px] font-bold text-slate-100">Reportes de Equipaje</h2>
                        </div>
                        <Link
                            to="/baggage-report"
                            className="flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
                        >
                            Nuevo reporte
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <StatCard title="Pendientes" value={stats.baggage.pending}  icon="📦" color="yellow" />
                        <StatCard title="Resueltos"  value={stats.baggage.resolved} icon="✓"  color="green"  />
                    </div>

                    <div className="card">
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">
                            Últimos reportes
                        </p>
                        {stats.baggage.recent.length > 0 ? (
                            <div style={{ borderTop: '1px solid rgba(148,163,184,0.06)' }}>
                                {stats.baggage.recent.map(r => {
                                    const { cls, label } = statusBadge(r.status);
                                    return (
                                        <div
                                            key={r.id}
                                            className="flex items-center justify-between py-3"
                                            style={{ borderBottom: '1px solid rgba(148,163,184,0.06)' }}
                                        >
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-slate-200 truncate">
                                                    {r.passenger_name}
                                                </p>
                                                <p className="font-mono text-[11px] text-slate-600 mt-0.5">
                                                    {r.flight_number}
                                                </p>
                                            </div>
                                            <span className={`ml-3 flex-shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full border ${cls}`}>
                                                {label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-slate-600 text-sm text-center py-4">Sin reportes recientes</p>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Dashboard;
