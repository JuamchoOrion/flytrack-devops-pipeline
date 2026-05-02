import type { Notification } from '../types';

interface NotificationCardProps {
    notification: Notification;
}

const priorityConfig = {
    low:    { bar: 'bg-slate-500',  bg: '',                    icon: 'ℹ️' },
    normal: { bar: 'bg-sky-500',    bg: 'bg-sky-950/20',       icon: '📢' },
    high:   { bar: 'bg-amber-500',  bg: 'bg-amber-950/20',     icon: '⚠️' },
    urgent: { bar: 'bg-red-500',    bg: 'bg-red-950/20',       icon: '🚨' },
} as const;

const typeLabel: Record<string, string> = {
    delay:        'Retraso',
    boarding:     'Embarque',
    gate_change:  'Cambio de Puerta',
    on_time:      'A Tiempo',
    cancellation: 'Cancelación',
    check_in:     'Check-in',
};

const fmtTime = (d: string) => {
    const diff = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
    if (diff < 1)    return 'Ahora';
    if (diff < 60)   return `${diff}m`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h`;
    return new Date(d).toLocaleDateString('es-CO');
};

const NotificationCard = ({ notification }: NotificationCardProps) => {
    const p = priorityConfig[notification.priority as keyof typeof priorityConfig] ?? priorityConfig.normal;

    return (
        <div
            className={`relative flex items-start gap-3 p-4 rounded-xl transition-all duration-200 ${p.bg}`}
            style={{ border: '1px solid rgba(148, 163, 184, 0.07)' }}
        >
            {/* Left priority stripe */}
            <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${p.bar}`} />

            {/* Icon */}
            <span className="text-base leading-none flex-shrink-0 mt-0.5 pl-2">{p.icon}</span>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0 flex-wrap">
                        <span className="font-mono text-sm font-bold text-white tracking-wider">
                            {notification.flight_number}
                        </span>
                        {notification.type && (
                            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-500 border border-slate-700/40">
                                {typeLabel[notification.type] ?? notification.type}
                            </span>
                        )}
                    </div>
                    <span className="text-[11px] text-slate-600 flex-shrink-0 font-mono">
                        {fmtTime(notification.created_at)}
                    </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{notification.message}</p>
                <p className="text-[11px] text-slate-600 mt-1.5">{notification.airline}</p>
            </div>
        </div>
    );
};

export default NotificationCard;
