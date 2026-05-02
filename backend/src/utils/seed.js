import { getDatabase, resetDatabase } from '../config/database.js';

function seedDatabase() {
    console.log('🌱 Iniciando seed de base de datos...');

    const db = getDatabase();

    // Limpiar datos existentes
    db.exec('DELETE FROM notifications');
    db.exec('DELETE FROM baggage_reports');
    db.exec('DELETE FROM flights');

    // Resetear autoincrement
    db.exec('DELETE FROM sqlite_sequence');

    // Datos de vuelos
    const flights = [
        {
            flight_number: 'AV123',
            airline: 'Avianca',
            origin: 'Bogotá (BOG)',
            destination: 'Medellín (MDE)',
            departure_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
            status: 'on-time',
            gate: 'A12'
        },
        {
            flight_number: 'LA456',
            airline: 'LATAM',
            origin: 'Bogotá (BOG)',
            destination: 'Cartagena (CTG)',
            departure_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString(),
            status: 'delayed',
            gate: 'B3'
        },
        {
            flight_number: 'VV789',
            airline: 'Viva Air',
            origin: 'Medellín (MDE)',
            destination: 'Cali (CLO)',
            departure_time: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            status: 'boarding',
            gate: 'C5'
        },
        {
            flight_number: 'AV234',
            airline: 'Avianca',
            origin: 'Cali (CLO)',
            destination: 'Bogotá (BOG)',
            departure_time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now()).toISOString(),
            status: 'arrived',
            gate: 'A8'
        },
        {
            flight_number: 'CM567',
            airline: 'Copa Airlines',
            origin: 'Bogotá (BOG)',
            destination: 'Panamá (PTY)',
            departure_time: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString(),
            status: 'on-time',
            gate: 'D1'
        },
        {
            flight_number: 'AV890',
            airline: 'Avianca',
            origin: 'Bogotá (BOG)',
            destination: 'Miami (MIA)',
            departure_time: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 14 * 60 * 60 * 1000).toISOString(),
            status: 'scheduled',
            gate: 'E2'
        },
        {
            flight_number: 'LA234',
            airline: 'LATAM',
            origin: 'Bogotá (BOG)',
            destination: 'Lima (LIM)',
            departure_time: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 8.5 * 60 * 60 * 1000).toISOString(),
            status: 'on-time',
            gate: 'B7'
        },
        {
            flight_number: 'VV345',
            airline: 'Viva Air',
            origin: 'Cartagena (CTG)',
            destination: 'Bogotá (BOG)',
            departure_time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 4.5 * 60 * 60 * 1000).toISOString(),
            status: 'delayed',
            gate: 'C2'
        },
        {
            flight_number: 'AV678',
            airline: 'Avianca',
            origin: 'Bogotá (BOG)',
            destination: 'Barranquilla (BAQ)',
            departure_time: new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString(),
            status: 'scheduled',
            gate: 'A15'
        },
        {
            flight_number: 'IB901',
            airline: 'Iberia',
            origin: 'Bogotá (BOG)',
            destination: 'Madrid (MAD)',
            departure_time: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
            status: 'on-time',
            gate: 'F4'
        },
        {
            flight_number: 'LA567',
            airline: 'LATAM',
            origin: 'Medellín (MDE)',
            destination: 'Bogotá (BOG)',
            departure_time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
            status: 'boarding',
            gate: 'B1'
        },
        {
            flight_number: 'AA789',
            airline: 'American Airlines',
            origin: 'Bogotá (BOG)',
            destination: 'Nueva York (JFK)',
            departure_time: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
            status: 'scheduled',
            gate: 'E5'
        },
        {
            flight_number: 'VV123',
            airline: 'Viva Air',
            origin: 'Bogotá (BOG)',
            destination: 'San Andrés (ADZ)',
            departure_time: new Date(Date.now() + 2.5 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
            status: 'on-time',
            gate: 'C8'
        },
        {
            flight_number: 'AV999',
            airline: 'Avianca',
            origin: 'Pereira (PEI)',
            destination: 'Bogotá (BOG)',
            departure_time: new Date(Date.now() + 1.5 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 2.5 * 60 * 60 * 1000).toISOString(),
            status: 'cancelled',
            gate: null
        },
        {
            flight_number: 'CM234',
            airline: 'Copa Airlines',
            origin: 'Panamá (PTY)',
            destination: 'Bogotá (BOG)',
            departure_time: new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
            status: 'scheduled',
            gate: 'D6'
        },
        {
            flight_number: 'FT001',
            airline: 'FlyTrack Air',
            origin: 'Bogotá (BOG)',
            destination: 'Armenia (AXM)',
            departure_time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
            status: 'on-time',
            gate: 'G1'
        },
        {
            flight_number: 'FT002',
            airline: 'FlyTrack Air',
            origin: 'Armenia (AXM)',
            destination: 'Bogotá (BOG)',
            departure_time: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
            arrival_time: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
            status: 'boarding',
            gate: 'G2'
        },

    ];

    const insertFlight = db.prepare(`
    INSERT INTO flights (flight_number, airline, origin, destination, departure_time, arrival_time, status, gate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

    const flightIds = [];
    for (const flight of flights) {
        const info = insertFlight.run(
            flight.flight_number,
            flight.airline,
            flight.origin,
            flight.destination,
            flight.departure_time,
            flight.arrival_time,
            flight.status,
            flight.gate
        );
        flightIds.push(info.lastInsertRowid);
    }

    console.log(`✅ ${flights.length} vuelos insertados`);

    // Datos de notificaciones
    const notifications = [
        {
            flight_id: flightIds[1],
            type: 'delay',
            message: 'Vuelo LA456 retrasado 45 minutos debido a condiciones meteorológicas',
            priority: 'high'
        },
        {
            flight_id: flightIds[2],
            type: 'boarding',
            message: 'Embarque del vuelo VV789 iniciado en puerta C5',
            priority: 'urgent'
        },
        {
            flight_id: flightIds[1],
            type: 'gate_change',
            message: 'Cambio de puerta para vuelo LA456: de B5 a B3',
            priority: 'high'
        },
        {
            flight_id: flightIds[0],
            type: 'on_time',
            message: 'Vuelo AV123 confirmado a tiempo',
            priority: 'normal'
        },
        {
            flight_id: flightIds[7],
            type: 'delay',
            message: 'Vuelo VV345 retrasado 30 minutos por congestión aérea',
            priority: 'normal'
        },
        {
            flight_id: flightIds[13],
            type: 'cancellation',
            message: 'Vuelo AV999 cancelado. Contacte a su aerolínea para reprogramar',
            priority: 'urgent'
        },
        {
            flight_id: flightIds[4],
            type: 'on_time',
            message: 'Vuelo CM567 listo para embarque según horario',
            priority: 'normal'
        },
        {
            flight_id: flightIds[10],
            type: 'boarding',
            message: 'Último llamado para embarque del vuelo LA567',
            priority: 'urgent'
        },
        {
            flight_id: flightIds[5],
            type: 'check_in',
            message: 'Check-in abierto para vuelo AV890 con destino a Miami',
            priority: 'normal'
        },
        {
            flight_id: flightIds[9],
            type: 'on_time',
            message: 'Vuelo IB901 a Madrid confirmado sin cambios',
            priority: 'low'
        }
    ];

    const insertNotification = db.prepare(`
    INSERT INTO notifications (flight_id, type, message, priority)
    VALUES (?, ?, ?, ?)
  `);

    for (const notification of notifications) {
        insertNotification.run(
            notification.flight_id,
            notification.type,
            notification.message,
            notification.priority
        );
    }

    console.log(`✅ ${notifications.length} notificaciones insertadas`);

    // Datos de reportes de equipaje
    const baggageReports = [
        {
            passenger_name: 'Carlos Martínez',
            passenger_id: 'CC1234567890',
            flight_number: 'AV123',
            issue_type: 'delayed',
            description: 'Mi maleta no llegó en el vuelo. Esperé en la banda transportadora pero no apareció.',
            contact: 'carlos.martinez@email.com',
            status: 'pending'
        },
        {
            passenger_name: 'Ana García',
            passenger_id: 'CC9876543210',
            flight_number: 'LA456',
            issue_type: 'damaged',
            description: 'La maleta llegó con la cerradura rota y una rueda dañada.',
            contact: 'ana.garcia@email.com',
            status: 'in-progress'
        },
        {
            passenger_name: 'Luis Rodríguez',
            passenger_id: 'CE5555666677',
            flight_number: 'VV789',
            issue_type: 'lost',
            description: 'No encuentro mi equipaje de mano que dejé en el área de espera.',
            contact: 'luis.rodriguez@email.com',
            status: 'pending'
        },
        {
            passenger_name: 'María López',
            passenger_id: 'CC3333444455',
            flight_number: 'CM567',
            issue_type: 'other',
            description: 'Me entregaron una maleta que no es mía. Color negro, marca Samsonite.',
            contact: 'maria.lopez@email.com',
            status: 'resolved'
        },
        {
            passenger_name: 'Pedro Sánchez',
            passenger_id: 'CC7777888899',
            flight_number: 'LA234',
            issue_type: 'damaged',
            description: 'Contenido de la maleta mojado. Parece que estuvo expuesta a lluvia.',
            contact: 'pedro.sanchez@email.com',
            status: 'in-progress'
        }
    ];

    const insertReport = db.prepare(`
    INSERT INTO baggage_reports (passenger_name, passenger_id, flight_number, issue_type, description, contact, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

    for (const report of baggageReports) {
        insertReport.run(
            report.passenger_name,
            report.passenger_id,
            report.flight_number,
            report.issue_type,
            report.description,
            report.contact,
            report.status
        );
    }

    console.log(`✅ ${baggageReports.length} reportes de equipaje insertados`);
    console.log('🎉 Base de datos poblada exitosamente!');
}

// Ejecutar seed si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    try {
        seedDatabase();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al poblar base de datos:', error);
        process.exit(1);
    }
}

export default seedDatabase;