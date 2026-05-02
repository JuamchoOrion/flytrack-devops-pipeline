import type { Flight } from '../types';

interface FlightCardProps {
    flight: Flight;
}

const statusConfig: Record<string, { label: string; badge: string; dot: string }> = {
    'on-time':   { label: 'A Tiempo',   badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-400'          },
    'delayed':   { label: 'Retrasado',  badge: 'bg-amber-500/10  text-amber-400  border-amber-500/20',    dot: 'bg-amber-400'            },
    'boarding':  { label: 'Embarcando', badge: 'bg-sky-500/10    text-sky-400    border-sky-500/20',      dot: 'bg-sky-400 animate-pulse' },
    'cancelled': { label: 'Cancelado',  badge: 'bg-red-500/10    text-red-400    border-red-500/20',      dot: 'bg-red-400'              },
    'departed':  { label: 'Despegado',  badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',   dot: 'bg-violet-400'           },
    'arrived':   { label: 'Llegó',      badge: 'bg-teal-500/10   text-teal-400   border-teal-500/20',     dot: 'bg-teal-400'             },
    'scheduled': { label: 'Programado', badge: 'bg-slate-700/40  text-slate-400  border-slate-600/30',    dot: 'bg-slate-500'            },
};

const fmt = (d: string) =>
    new Date(d).toLocaleString('es-CO', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

const FlightCard = ({ flight }: FlightCardProps) => {
    const st = statusConfig[flight.status] ?? statusConfig['scheduled'];

    return (
        <div className="card hover:scale-[1.015] hover:-translate-y-0.5 cursor-default animate-fade-in">

            {/* ── Header ── */}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <p
                        className="text-xl font-bold text-white tracking-widest leading-none mb-1 font-mono"
                    >
                        {flight.flight_number}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">{flight.airline}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1.5 rounded-full border ${st.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${st.dot}`} />
                    {st.label}
                </span>
            </div>

            {/* ── Route ── */}
            <div className="flex items-stretch gap-3 mb-5">
                <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Origen</p>
                    <p className="text-sm font-bold text-slate-200 truncate">{flight.origin}</p>
                    <p className="text-xs text-slate-600 mt-0.5 font-mono text-[11px]">{fmt(flight.departure_time)}</p>
                </div>

                <div className="flex flex-col items-center justify-center gap-1 px-1 flex-shrink-0">
                    <div className="w-1 h-1 rounded-full bg-slate-700" />
                    <div className="w-px flex-1 bg-gradient-to-b from-slate-700 to-slate-800" style={{ minHeight: '20px' }} />
                    <svg className="w-3.5 h-3.5 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                </div>

                <div className="flex-1 min-w-0 text-right">
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Destino</p>
                    <p className="text-sm font-bold text-slate-200 truncate">{flight.destination}</p>
                    <p className="text-xs text-slate-600 mt-0.5 font-mono text-[11px]">{fmt(flight.arrival_time)}</p>
                </div>
            </div>

            {/* ── Gate ── */}
            <div className="pt-3.5 border-t" style={{ borderColor: 'rgba(148, 163, 184, 0.07)' }}>
                {flight.gate ? (
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                            Puerta de Embarque
                        </span>
                        <span className="font-mono text-lg font-bold text-sky-400 tracking-widest">
                            {flight.gate}
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Puerta</span>
                        <span className="text-xs text-slate-700 italic">Sin asignar</span>
                    </div>
                )}
            </div>

        </div>
    );
};

export default FlightCard;
