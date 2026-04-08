import { getDatabase } from '../config/database.js';

class FlightRepository {
    constructor() {
        this.db = getDatabase();
    }

    findAll() {
        const stmt = this.db.prepare(`
      SELECT * FROM flights 
      ORDER BY departure_time ASC
    `);
        return stmt.all();
    }

    findById(id) {
        const stmt = this.db.prepare('SELECT * FROM flights WHERE id = ?');
        return stmt.get(id);
    }

    findByFlightNumber(flightNumber) {
        const stmt = this.db.prepare('SELECT * FROM flights WHERE flight_number = ?');
        return stmt.get(flightNumber);
    }

    search(query) {
        const searchTerm = `%${query}%`;
        const stmt = this.db.prepare(`
      SELECT * FROM flights 
      WHERE flight_number LIKE ? 
         OR airline LIKE ? 
         OR origin LIKE ? 
         OR destination LIKE ?
         OR status LIKE ?
      ORDER BY departure_time ASC
    `);
        return stmt.all(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    countByStatus(status) {
        const stmt = this.db.prepare('SELECT COUNT(*) as count FROM flights WHERE status = ?');
        const result = stmt.get(status);
        return result.count;
    }

    create(flightData) {
        const stmt = this.db.prepare(`
      INSERT INTO flights (
        flight_number, airline, origin, destination, 
        departure_time, arrival_time, status, gate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

        const info = stmt.run(
            flightData.flight_number,
            flightData.airline,
            flightData.origin,
            flightData.destination,
            flightData.departure_time,
            flightData.arrival_time,
            flightData.status || 'scheduled',
            flightData.gate || null
        );

        return this.findById(info.lastInsertRowid);
    }

    update(id, flightData) {
        const stmt = this.db.prepare(`
      UPDATE flights 
      SET status = ?, 
          gate = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

        stmt.run(flightData.status, flightData.gate, id);
        return this.findById(id);
    }
}

export default new FlightRepository();