import { useEffect, useState } from 'react';
import { flightApi } from '../services/api';
import type { Flight } from '../types';
import FlightCard from '../components/FlightCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Flights = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadFlights();
    }, []);

    const loadFlights = async () => {
        try {
            setLoading(true);
            const response = await flightApi.getAll();
            if (response.data.success && response.data.data) {
                setFlights(response.data.data);
            }
        } catch (err) {
            setError('Error al cargar vuelos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            loadFlights();
            return;
        }

        try {
            setLoading(true);
            const response = await flightApi.search(searchQuery);
            if (response.data.success && response.data.data) {
                setFlights(response.data.data);
            }
        } catch (err) {
            setError('Error al buscar vuelos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Vuelos</h1>
                <p className="text-gray-600">Consulta y busca información de vuelos</p>
            </div>

            {/* Barra de búsqueda */}
            <div className="card">
                <form onSubmit={handleSearch} className="flex gap-3">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar por número de vuelo, aerolínea, origen, destino o estado..."
                        className="input-field flex-1"
                    />
                    <button type="submit" className="btn-primary">
                        Buscar
                    </button>
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery('');
                                loadFlights();
                            }}
                            className="btn-secondary"
                        >
                            Limpiar
                        </button>
                    )}
                </form>
            </div>

            {/* Resultados */}
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <div className="text-center text-red-600">{error}</div>
            ) : flights.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No se encontraron vuelos</p>
                </div>
            ) : (
                <>
                    <div className="text-sm text-gray-600">
                        Mostrando {flights.length} vuelo{flights.length !== 1 ? 's' : ''}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {flights.map((flight) => (
                            <FlightCard key={flight.id} flight={flight} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Flights;