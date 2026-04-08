import { getDatabase } from '../config/database.js';

class NotificationRepository {
    constructor() {
        this.db = getDatabase();
    }

    findAll(limit = 50) {
        const stmt = this.db.prepare(`
      SELECT 
        n.*,
        f.flight_number,
        f.airline,
        f.origin,
        f.destination
      FROM notifications n
      JOIN flights f ON n.flight_id = f.id
      ORDER BY n.created_at DESC
      LIMIT ?
    `);
        return stmt.all(limit);
    }

    findById(id) {
        const stmt = this.db.prepare(`
      SELECT 
        n.*,
        f.flight_number,
        f.airline,
        f.origin,
        f.destination
      FROM notifications n
      JOIN flights f ON n.flight_id = f.id
      WHERE n.id = ?
    `);
        return stmt.get(id);
    }

    findByFlightId(flightId) {
        const stmt = this.db.prepare(`
      SELECT * FROM notifications 
      WHERE flight_id = ?
      ORDER BY created_at DESC
    `);
        return stmt.all(flightId);
    }

    getRecent(limit = 5) {
        const stmt = this.db.prepare(`
      SELECT 
        n.*,
        f.flight_number
      FROM notifications n
      JOIN flights f ON n.flight_id = f.id
      ORDER BY n.created_at DESC
      LIMIT ?
    `);
        return stmt.all(limit);
    }

    create(notificationData) {
        const stmt = this.db.prepare(`
      INSERT INTO notifications (flight_id, type, message, priority)
      VALUES (?, ?, ?, ?)
    `);

        const info = stmt.run(
            notificationData.flight_id,
            notificationData.type,
            notificationData.message,
            notificationData.priority || 'normal'
        );

        return this.findById(info.lastInsertRowid);
    }
}

export default new NotificationRepository();