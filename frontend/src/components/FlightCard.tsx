import type { Flight } from '../types';

interface FlightCardProps {
    flight: Flight;
}

const FlightCard = ({ flight }: FlightCardProps) => {
    const getStatusColor = (status: string) => {
        const colors = {
            'on-time': 'bg-green-100 text-green-800',
            'delayed': 'bg-yellow-100 text-yellow-800',
            'boarding': 'bg-blue-100 text-blue-800',
            'cancelled': 'bg-red-100 text-red-800',
            'departed': 'bg-gray-100 text-gray-800',
            'arrived': 'bg-green-100 text-green-800',
            'scheduled': 'bg-blue-50 text-blue-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status: string) => {
        const texts = {
            'on-time': 'A Tiempo',
            'delayed': 'Retrasado',
            'boarding': 'Embarcando',
            'cancelled': 'Cancelado',
            'departed': 'Despegado',
            'arrived': 'Llegó',
            'scheduled': 'Programado',
        };
        return texts[status as keyof typeof texts] || status;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('es-CO', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{flight.flight_number}</h3>
                    <p className="text-sm text-gray-600">{flight.airline}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(flight.status)}`}>
          {getStatusText(flight.status)}
        </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Origen</p>
                    <p className="font-semibold text-gray-800">{flight.origin}</p>
                    <p className="text-sm text-gray-600">{formatDate(flight.departure_time)}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Destino</p>
                    <p className="font-semibold text-gray-800">{flight.destination}</p>
                    <p className="text-sm text-gray-600">{formatDate(flight.arrival_time)}</p>
                </div>
            </div>

            {flight.gate && (
                <div className="border-t pt-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Puerta de Embarque</span>
                        <span className="text-lg font-bold text-primary-600">{flight.gate}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlightCard;