import request from 'supertest';
import app from '../src/app.js';
import { getDatabase, resetDatabase } from '../src/config/database.js';

beforeAll(() => {
    getDatabase();
});

beforeEach(() => {
    resetDatabase();
});

const flightPayload = {
    flight_number: 'FT234',
    airline: 'AeroPuerto Smart',
    origin: 'BOG',
    destination: 'LAX',
    departure_time: '2026-12-02T10:00:00Z',
    arrival_time: '2026-12-02T14:00:00Z'
};

const notificationPayload = {
    type: 'gate change',
    message: 'Gate changed to A12',
    priority: 'normal'
};

test('creates a notification for a flight and retrieves notifications', async () => {
    const flightResponse = await request(app).post('/api/flights').send(flightPayload);
    expect(flightResponse.status).toBe(201);

    const flightId = flightResponse.body.data.id;
    const createResponse = await request(app)
        .post('/api/notifications')
        .send({
            flight_id: flightId,
            ...notificationPayload
        });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toEqual(
        expect.objectContaining({
            success: true,
            data: expect.objectContaining({
                flight_id: flightId,
                message: notificationPayload.message,
            })
        })
    );

    const listResponse = await request(app).get('/api/notifications');

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ message: notificationPayload.message })
        ])
    );
});

test('returns validation error for invalid notification payload', async () => {
    const response = await request(app)
        .post('/api/notifications')
        .send({
            flight_id: 'abc',
            type: '',
            message: '',
            priority: 'invalid'
        });

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
        expect.objectContaining({
            success: false,
            message: 'Errores de validación',
            errors: expect.any(Array)
        })
    );
});

test('returns 400 when creating notification for missing flight', async () => {
    const response = await request(app)
        .post('/api/notifications')
        .send({
            flight_id: 999,
            type: 'gate change',
            message: 'Gate changed',
            priority: 'normal'
        });

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
        expect.objectContaining({
            success: false,
            message: 'El vuelo especificado no existe'
        })
    );
});

test('returns notification details by id', async () => {
    const flightResponse = await request(app).post('/api/flights').send(flightPayload);
    const flightId = flightResponse.body.data.id;

    const createResponse = await request(app)
        .post('/api/notifications')
        .send({
            flight_id: flightId,
            type: 'gate change',
            message: 'Gate changed',
            priority: 'normal'
        });

    const notificationId = createResponse.body.data.id;
    const getResponse = await request(app).get(`/api/notifications/${notificationId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual(
        expect.objectContaining({
            success: true,
            data: expect.objectContaining({
                id: notificationId,
                flight_id: flightId
            })
        })
    );
});

test('returns 404 when fetching a missing notification by id', async () => {
    const response = await request(app).get('/api/notifications/9999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
        expect.objectContaining({
            success: false,
            message: 'Notificación no encontrada'
        })
    );
});
