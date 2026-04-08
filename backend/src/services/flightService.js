import flightRepository from '../repositories/flightRepository.js';

class FlightService {
    async getAllFlights() {
        try {
            const flights = flightRepository.findAll();
            return {
                success: true,
                data: flights,
                count: flights.length
            };
        } catch (error) {
            throw new Error(`Error al obtener vuelos: ${error.message}`);
        }
    }

    async getFlightById(id) {
        try {
            const flight = flightRepository.findById(id);

            if (!flight) {
                return {
                    success: false,
                    message: 'Vuelo no encontrado'
                };
            }

            return {
                success: true,
                data: flight
            };
        } catch (error) {
            throw new Error(`Error al obtener vuelo: ${error.message}`);
        }
    }

    async searchFlights(query) {
        try {
            if (!query || query.trim() === '') {
                return this.getAllFlights();
            }

            const flights = flightRepository.search(query.trim());

            return {
                success: true,
                data: flights,
                count: flights.length,
                query: query
            };
        } catch (error) {
            throw new Error(`Error al buscar vuelos: ${error.message}`);
        }
    }

    async createFlight(flightData) {
        try {
            // Validar que el vuelo no exista
            const existing = flightRepository.findByFlightNumber(flightData.flight_number);
            if (existing) {
                return {
                    success: false,
                    message: 'Ya existe un vuelo con ese número'
                };
            }

            const flight = flightRepository.create(flightData);

            return {
                success: true,
                data: flight,
                message: 'Vuelo creado exitosamente'
            };
        } catch (error) {
            throw new Error(`Error al crear vuelo: ${error.message}`);
        }
    }

    async updateFlight(id, flightData) {
        try {
            const existing = flightRepository.findById(id);
            if (!existing) {
                return {
                    success: false,
                    message: 'Vuelo no encontrado'
                };
            }

            const updated = flightRepository.update(id, flightData);

            return {
                success: true,
                data: updated,
                message: 'Vuelo actualizado exitosamente'
            };
        } catch (error) {
            throw new Error(`Error al actualizar vuelo: ${error.message}`);
        }
    }
}

export default new FlightService();