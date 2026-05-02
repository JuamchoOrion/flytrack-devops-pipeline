const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-5">
            {/* Concentric-ring aviation spinner */}
            <div className="relative w-14 h-14">
                {/* Outer track */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{ border: '2px solid rgba(148, 163, 184, 0.06)' }}
                />
                {/* Outer spinner */}
                <div
                    className="absolute inset-0 rounded-full animate-spin"
                    style={{ border: '2px solid transparent', borderTopColor: '#0ea5e9' }}
                />
                {/* Inner track */}
                <div
                    className="absolute inset-[9px] rounded-full"
                    style={{ border: '2px solid rgba(148, 163, 184, 0.05)' }}
                />
                {/* Inner spinner (reverse) */}
                <div
                    className="absolute inset-[9px] rounded-full animate-spin"
                    style={{
                        border: '2px solid transparent',
                        borderTopColor: 'rgba(56, 189, 248, 0.45)',
                        animationDuration: '1.4s',
                        animationDirection: 'reverse',
                    }}
                />
                {/* Center dot */}
                <div
                    className="absolute inset-[21px] rounded-full"
                    style={{ background: 'rgba(14, 165, 233, 0.2)' }}
                />
            </div>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] animate-pulse">
                Cargando
            </p>
        </div>
    );
};

export default LoadingSpinner;
