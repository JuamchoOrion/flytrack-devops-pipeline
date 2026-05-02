import { useEffect, useState } from 'react';
import { flightApi } from '../services/api';
import type { Flight } from '../types';
import FlightCard from '../components/FlightCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Flights = () => {
    const [flights, setFlights]       = useState<Flight[]>([]);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => { loadFlights(); }, []);

    const loadFlights = async () => {
        try {
            setLoading(true);
            const res = await flightApi.getAll();
            if (res.data.success && res.data.data) setFlights(res.data.data);
        } catch {
            setError('Error al cargar vuelos');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) { loadFlights(); return; }
        try {
            setLoading(true);
            const res = await flightApi.search(searchQuery);
            if (res.data.success && res.data.data) setFlights(res.data.data);
        } catch {
            setError('Error al buscar vuelos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">

            {/* ── Header ── */}
            <div>
                <p className="text-[10px] font-bold text-sky-500/70 uppercase tracking-[0.2em] mb-2">
                    Itinerarios
                </p>
                <h1 className="text-[1.75rem] font-bold text-white tracking-tight leading-none">Vuelos</h1>
                <p className="text-slate-500 text-sm mt-1.5">Consulta estado y puertas de embarque</p>
            </div>

            {/* ── Search ── */}
            <div className="card">
                <form onSubmit={handleSearch} className="flex gap-3">
                    <div className="relative flex-1">
                        <svg
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Número de vuelo, aerolínea, origen, destino..."
                            className="input-field pl-10"
                        />
                    </div>
                    <button type="submit" className="btn-primary">Buscar</button>
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => { setSearchQuery(''); loadFlights(); }}
                            className="btn-secondary"
                        >
                            Limpiar
                        </button>
                    )}
                </form>
            </div>

            {/* ── Results ── */}
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <div className="card text-center py-10">
                    <p className="text-red-400 font-semibold text-sm">{error}</p>
                </div>
            ) : flights.length === 0 ? (
                <div className="card text-center py-16">
                    <div className="text-4xl mb-4 opacity-20 select-none">✈</div>
                    <p className="text-slate-500 font-semibold text-sm">No se encontraron vuelos</p>
                    {searchQuery && (
                        <p className="text-slate-600 text-xs mt-1">Intenta con otro término de búsqueda</p>
                    )}
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                        <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                            {flights.length} vuelo{flights.length !== 1 ? 's' : ''} encontrado{flights.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {flights.map(f => <FlightCard key={f.id} flight={f} />)}
                    </div>
                </>
            )}
        </div>
    );
};

export default Flights;
