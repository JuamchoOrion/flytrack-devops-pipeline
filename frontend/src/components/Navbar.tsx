import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const navLinkClass = (path: string) =>
        `px-4 py-2 rounded-lg transition-colors ${
            isActive(path)
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
        }`;

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">✈️</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800">FlyTrack</span>
                    </Link>

                    <div className="flex space-x-2">
                        <Link to="/" className={navLinkClass('/')}>
                            Dashboard
                        </Link>
                        <Link to="/flights" className={navLinkClass('/flights')}>
                            Vuelos
                        </Link>
                        <Link to="/notifications" className={navLinkClass('/notifications')}>
                            Notificaciones
                        </Link>
                        <Link to="/baggage-report" className={navLinkClass('/baggage-report')}>
                            Reportar Equipaje
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;