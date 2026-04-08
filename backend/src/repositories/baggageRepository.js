import { getDatabase } from '../config/database.js';

class BaggageRepository {
    constructor() {
        this.db = getDatabase();
    }

    findAll() {
        const stmt = this.db.prepare(`
      SELECT * FROM baggage_reports 
      ORDER BY created_at DESC
    `);
        return stmt.all();
    }

    findById(id) {
        const stmt = this.db.prepare('SELECT * FROM baggage_reports WHERE id = ?');
        return stmt.get(id);
    }

    getRecent(limit = 5) {
        const stmt = this.db.prepare(`
      SELECT * FROM baggage_reports 
      ORDER BY created_at DESC
      LIMIT ?
    `);
        return stmt.all(limit);
    }

    countByStatus(status) {
        const stmt = this.db.prepare('SELECT COUNT(*) as count FROM baggage_reports WHERE status = ?');
        const result = stmt.get(status);
        return result.count;
    }

    create(reportData) {
        const stmt = this.db.prepare(`
      INSERT INTO baggage_reports (
        passenger_name, passenger_id, flight_number, 
        issue_type, description, contact, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

        const info = stmt.run(
            reportData.passenger_name,
            reportData.passenger_id,
            reportData.flight_number,
            reportData.issue_type,
            reportData.description,
            reportData.contact,
            reportData.status || 'pending'
        );

        return this.findById(info.lastInsertRowid);
    }

    updateStatus(id, status) {
        const stmt = this.db.prepare(`
      UPDATE baggage_reports 
      SET status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

        stmt.run(status, id);
        return this.findById(id);
    }
}

export default new BaggageRepository();