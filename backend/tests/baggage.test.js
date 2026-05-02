import request from 'supertest';
import app from '../src/app.js';
import { getDatabase, resetDatabase } from '../src/config/database.js';

beforeAll(() => {
    getDatabase();
});

beforeEach(() => {
    resetDatabase();
});

const baggagePayload = {
    passenger_name: 'Maria Lopez',
    passenger_id: 'CC123456',
    flight_number: 'FT345',
    issue_type: 'lost',
    description: 'Maleta no llegó a la cinta',
    contact: 'maria.lopez@example.com'
};

test('creates a baggage report and lists it', async () => {
    const createResponse = await request(app)
        .post('/api/baggage')
        .send(baggagePayload);

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toEqual(
        expect.objectContaining({
            success: true,
            data: expect.objectContaining({ passenger_name: baggagePayload.passenger_name })
        })
    );

    const listResponse = await request(app).get('/api/baggage');

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ passenger_name: baggagePayload.passenger_name })
        ])
    );
});

test('returns validation error for invalid baggage report', async () => {
    const response = await request(app)
        .post('/api/baggage')
        .send({
            passenger_name: '',
            passenger_id: '',
            flight_number: '',
            issue_type: 'unknown',
            description: '',
            contact: 'not-an-email'
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

test('updates baggage report status and returns 404 for missing report', async () => {
    const createResponse = await request(app).post('/api/baggage').send(baggagePayload);
    const reportId = createResponse.body.data.id;

    const updateResponse = await request(app)
        .put(`/api/baggage/${reportId}/status`)
        .send({ status: 'resolved' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toEqual(
        expect.objectContaining({
            success: true,
            data: expect.objectContaining({
                status: 'resolved'
            })
        })
    );

    const missingResponse = await request(app)
        .put('/api/baggage/9999/status')
        .send({ status: 'resolved' });

    expect(missingResponse.status).toBe(404);
    expect(missingResponse.body).toEqual(
        expect.objectContaining({
            success: false,
            message: 'Reporte no encontrado'
        })
    );
});

test('returns baggage report details by id', async () => {
    const createResponse = await request(app).post('/api/baggage').send(baggagePayload);
    const reportId = createResponse.body.data.id;

    const getResponse = await request(app).get(`/api/baggage/${reportId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual(
        expect.objectContaining({
            success: true,
            data: expect.objectContaining({
                id: reportId,
                passenger_name: baggagePayload.passenger_name
            })
        })
    );
});

test('returns 404 when fetching a missing baggage report by id', async () => {
    const response = await request(app).get('/api/baggage/9999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
        expect.objectContaining({
            success: false,
            message: 'Reporte no encontrado'
        })
    );
});
