import { useEffect, useState } from 'react';
import { notificationApi } from '../services/api';
import type { Notification } from '../types';
import NotificationCard from '../components/NotificationCard';
import LoadingSpinner from '../components/LoadingSpinner';

const PRIORITY_ORDER = ['urgent', 'high', 'normal', 'low'] as const;

const SECTION_META: Record<string, { label: string; color: string; dot: string }> = {
    urgent: { label: 'Urgentes',       color: 'text-red-400',    dot: 'bg-red-500'    },
    high:   { label: 'Alta Prioridad', color: 'text-amber-400',  dot: 'bg-amber-500'  },
    normal: { label: 'Normales',       color: 'text-sky-400',    dot: 'bg-sky-500'    },
    low:    { label: 'Información',    color: 'text-slate-400',  dot: 'bg-slate-500'  },
};

const Notifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<string | null>(null);

    useEffect(() => { loadNotifications(); }, []);

    const loadNotifications = async () => {
        try {
            setLoading(true);
            const res = await notificationApi.getAll();
            if (res.data.success && res.data.data) setNotifications(res.data.data);
        } catch {
            setError('Error al cargar notificaciones');
        } finally {
            setLoading(false);
        }
    };

    const byPriority = (p: string) => notifications.filter(n => n.priority === p);

    return (
        <div className="space-y-6 animate-fade-in">

            {/* ── Header ── */}
            <div>
                <p className="text-[10px] font-bold text-sky-500/70 uppercase tracking-[0.2em] mb-2">Alertas</p>
                <h1 className="text-[1.75rem] font-bold text-white tracking-tight leading-none">Notificaciones</h1>
                <p className="text-slate-500 text-sm mt-1.5">Cambios de estado y alertas de vuelos</p>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <div className="card text-center py-10">
                    <p className="text-red-400 font-semibold text-sm">{error}</p>
                </div>
            ) : notifications.length === 0 ? (
                <div className="card text-center py-16">
                    <div className="text-4xl mb-4 opacity-20 select-none">📭</div>
                    <p className="text-slate-500 font-semibold text-sm">Sin notificaciones activas</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {PRIORITY_ORDER.map(p => {
                        const items = byPriority(p);
                        if (items.length === 0) return null;
                        const { label, color, dot } = SECTION_META[p];
                        return (
                            <section key={p}>
                                {/* Section header */}
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
                                    <span className={`text-[11px] font-bold uppercase tracking-widest ${color}`}>
                                        {label}
                                    </span>
                                    <span className="font-mono text-[11px] text-slate-700">{items.length}</span>
                                    <div className="flex-1 h-px" style={{ background: 'rgba(148,163,184,0.06)' }} />
                                </div>
                                {/* Cards */}
                                <div className="space-y-2">
                                    {items.map(n => <NotificationCard key={n.id} notification={n} />)}
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Notifications;
