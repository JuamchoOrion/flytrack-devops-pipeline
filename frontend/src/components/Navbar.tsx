import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { path: '/',               label: 'Dashboard'      },
    { path: '/flights',        label: 'Vuelos'         },
    { path: '/notifications',  label: 'Notificaciones' },
    { path: '/baggage-report', label: 'Equipaje'       },
];

const Navbar = () => {
    const { pathname } = useLocation();

    return (
        <nav
            className="sticky top-0 z-50 border-b"
            style={{
                background:    'rgba(8, 15, 30, 0.88)',
                backdropFilter:'blur(14px)',
                borderColor:   'rgba(148, 163, 184, 0.07)',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-15 py-3">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
                                boxShadow:  '0 0 14px rgba(14, 165, 233, 0.35)',
                            }}
                        >
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                        </div>
                        <div className="leading-tight">
                            <p className="font-bold text-white text-[15px] tracking-tight">FlyTrack</p>
                            <p className="text-[9px] font-semibold text-sky-400/60 tracking-[0.18em] uppercase hidden sm:block">
                                AeroPuerto Smart
                            </p>
                        </div>
                    </Link>

                    {/* Links */}
                    <div className="flex items-center gap-0.5">
                        {navLinks.map(({ path, label }) => {
                            const active = pathname === path;
                            return (
                                <Link
                                    key={path}
                                    to={path}
                                    className={`relative px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                                        active
                                            ? 'text-sky-300'
                                            : 'text-slate-500 hover:text-slate-200'
                                    }`}
                                >
                                    {active && (
                                        <span
                                            className="absolute inset-0 rounded-lg"
                                            style={{
                                                background:   'rgba(14, 165, 233, 0.08)',
                                                border:       '1px solid rgba(14, 165, 233, 0.18)',
                                            }}
                                        />
                                    )}
                                    <span className="relative">{label}</span>
                                </Link>
                            );
                        })}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
