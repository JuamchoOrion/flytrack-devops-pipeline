import request from 'supertest';
import app from '../src/app.js';
import { getDatabase, resetDatabase } from '../src/config/database.js';

beforeAll(() => {
    getDatabase();
});

beforeEach(() => {
    resetDatabase();
});

const flightPayload = (number, status) => ({
    flight_number: number,
    airline: 'AeroPuerto Smart',
    origin: 'BOG',
    destination: 'MIA',
    departure_time: '2026-12-01T08:00:00Z',
    arrival_time: '2026-12-01T12:00:00Z',
    status
});

const baggagePayload = {
    passenger_name: 'Diego Perez',
    passenger_id: 'CC999999',
    flight_number: 'FT500',
    issue_type: 'lost',
    description: 'Maleta perdida',
    contact: 'diego.perez@example.com'
};

test('returns dashboard statistics for flights, notifications, and baggage', async () => {
    await request(app).post('/api/flights').send(flightPayload('FT400', 'delayed'));
    await request(app).post('/api/flights').send(flightPayload('FT401', 'boarding'));
    await request(app).post('/api/flights').send(flightPayload('FT402', 'on-time'));
    await request(app).post('/api/flights').send(flightPayload('FT403', 'cancelled'));

    const flightResponse = await request(app).post('/api/flights').send(flightPayload('FT404', 'scheduled'));
    const flightId = flightResponse.body.data.id;

    await request(app)
        .post('/api/notifications')
        .send({ flight_id: flightId, type: 'gate change', message: 'Gate changed', priority: 'normal' });

    await request(app)
        .post('/api/notifications')
        .send({ flight_id: flightId, type: 'boarding', message: 'Boarding now', priority: 'high' });

    const baggageResponse = await request(app).post('/api/baggage').send(baggagePayload);
    const baggageId = baggageResponse.body.data.id;
    await request(app).put(`/api/baggage/${baggageId}/status`).send({ status: 'resolved' });

    const response = await request(app).get('/api/dashboard/stats');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
        expect.objectContaining({
            success: true,
            data: expect.objectContaining({
                flights: expect.objectContaining({
                    total: 5,
                    delayed: 1,
                    boarding: 1,
                    onTime: 1,
                    cancelled: 1
                }),
                notifications: expect.objectContaining({
                    total: 2,
                    recent: expect.any(Array)
                }),
                baggage: expect.objectContaining({
                    pending: 0,
                    resolved: 1,
                    recent: expect.any(Array)
                })
            })
        })
    );
});
