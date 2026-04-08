import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = process.env.DATABASE_PATH || join(__dirname, '../../flytrack.db');

let db = null;

export function getDatabase() {
    if (!db) {
        db = new Database(DB_PATH, {
            verbose: process.env.NODE_ENV === 'development' ? console.log : null
        });

        // Habilitar foreign keys
        db.pragma('foreign_keys = ON');

        initializeTables();
    }
    return db;
}

function initializeTables() {
    // Tabla de vuelos
    db.exec(`
    CREATE TABLE IF NOT EXISTS flights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      flight_number VARCHAR(10) NOT NULL UNIQUE,
      airline VARCHAR(100) NOT NULL,
      origin VARCHAR(100) NOT NULL,
      destination VARCHAR(100) NOT NULL,
      departure_time DATETIME NOT NULL,
      arrival_time DATETIME NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'scheduled',
      gate VARCHAR(10),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Tabla de notificaciones
    db.exec(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      flight_id INTEGER NOT NULL,
      type VARCHAR(50) NOT NULL,
      message TEXT NOT NULL,
      priority VARCHAR(20) DEFAULT 'normal',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE
    )
  `);

    // Tabla de reportes de equipaje
    db.exec(`
    CREATE TABLE IF NOT EXISTS baggage_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      passenger_name VARCHAR(200) NOT NULL,
      passenger_id VARCHAR(50) NOT NULL,
      flight_number VARCHAR(10) NOT NULL,
      issue_type VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      contact VARCHAR(100) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Índices para mejorar rendimiento
    db.exec(`
    CREATE INDEX IF NOT EXISTS idx_flights_status ON flights(status);
    CREATE INDEX IF NOT EXISTS idx_flights_departure ON flights(departure_time);
    CREATE INDEX IF NOT EXISTS idx_notifications_flight ON notifications(flight_id);
    CREATE INDEX IF NOT EXISTS idx_baggage_flight ON baggage_reports(flight_number);
  `);
}

export function closeDatabase() {
    if (db) {
        db.close();
        db = null;
    }
}

// Para usar en tests
export function resetDatabase() {
    if (db) {
        db.exec('DROP TABLE IF EXISTS baggage_reports');
        db.exec('DROP TABLE IF EXISTS notifications');
        db.exec('DROP TABLE IF EXISTS flights');
        initializeTables();
    }
}