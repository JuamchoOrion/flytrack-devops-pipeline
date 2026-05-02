interface StatCardProps {
    title: string;
    value: number;
    icon: string;
    color: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

const palette = {
    blue:   { num: 'text-sky-400',     icon: 'bg-sky-500/10 border-sky-500/20'     },
    green:  { num: 'text-emerald-400', icon: 'bg-emerald-500/10 border-emerald-500/20' },
    yellow: { num: 'text-amber-400',   icon: 'bg-amber-500/10 border-amber-500/20' },
    red:    { num: 'text-red-400',     icon: 'bg-red-500/10 border-red-500/20'     },
    gray:   { num: 'text-slate-400',   icon: 'bg-slate-700/30 border-slate-600/20' },
} as const;

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
    const c = palette[color];

    return (
        <div className="card group">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2.5 truncate">
                        {title}
                    </p>
                    <p
                        className={`text-[2.2rem] font-bold leading-none tracking-tight ${c.num}`}
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                        {value}
                    </p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${c.icon}`}>
                    <span className="text-lg leading-none">{icon}</span>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
