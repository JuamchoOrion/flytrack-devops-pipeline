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
    flight_number: 'FT123',
    airline: 'AeroPuerto Smart',
    origin: 'BOG',
    destination: 'MIA',
    departure_time: '2026-12-01T08:00:00Z',
    arrival_time: '2026-12-01T12:00:00Z'
};

test('creates a flight and returns it in the flight list', async () => {
    const createResponse = await request(app)
        .post('/api/flights')
        .send(flightPayload);

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toEqual(
        expect.objectContaining({
            success: true,
            data: expect.objectContaining({
                flight_number: flightPayload.flight_number,
                airline: flightPayload.airline,
            })
        })
    );

    const listResponse = await request(app).get('/api/flights');

    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toEqual(
        expect.objectContaining({
            success: true,
            data: expect.arrayContaining([
                expect.objectContaining({ flight_number: flightPayload.flight_number })
            ])
        })
    );
});

test('returns validation errors when creating invalid flight data', async () => {
    const response = await request(app)
        .post('/api/flights')
        .send({
            flight_number: '',
            airline: '',
            origin: 'BOG'
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

test('returns 400 when creating a duplicate flight number', async () => {
    await request(app).post('/api/flights').send(flightPayload);

    const response = await request(app).post('/api/flights').send(flightPayload);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
        expect.objectContaining({
            success: false,
            message: 'Ya existe un vuelo con ese número'
        })
    );
});

test('updates an existing flight and returns 404 for missing flight', async () => {
    const createResponse = await request(app).post('/api/flights').send(flightPayload);
    const flightId = createResponse.body.data.id;

    const updateResponse = await request(app)
        .put(`/api/flights/${flightId}`)
        .send({ status: 'boarding', gate: 'B20' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toEqual(
        expect.objectContaining({
            success: true,
            data: expect.objectContaining({
                status: 'boarding',
                gate: 'B20'
            })
        })
    );

    const missingResponse = await request(app)
        .put('/api/flights/9999')
        .send({ status: 'delayed' });

    expect(missingResponse.status).toBe(404);
    expect(missingResponse.body).toEqual(
        expect.objectContaining({
            success: false,
            message: 'Vuelo no encontrado'
        })
    );
});

test('returns flight details by id and supports search', async () => {
    const createResponse = await request(app).post('/api/flights').send(flightPayload);
    const flightId = createResponse.body.data.id;

    const getResponse = await request(app).get(`/api/flights/${flightId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual(
        expect.objectContaining({
            success: true,
            data: expect.objectContaining({
                id: flightId,
                flight_number: flightPayload.flight_number
            })
        })
    );

    const searchResponse = await request(app).get('/api/flights/search').query({ query: 'BOG' });
    expect(searchResponse.status).toBe(200);
    expect(searchResponse.body).toEqual(
        expect.objectContaining({
            success: true,
            data: expect.arrayContaining([
                expect.objectContaining({ origin: 'BOG' })
            ])
        })
    );

    const emptySearchResponse = await request(app).get('/api/flights/search').query({ query: '' });
    expect(emptySearchResponse.status).toBe(200);
    expect(emptySearchResponse.body).toEqual(
        expect.objectContaining({
            success: true,
            count: expect.any(Number)
        })
    );
});

test('returns 404 when fetching a non-existing flight by id', async () => {
    const response = await request(app).get('/api/flights/9999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
        expect.objectContaining({
            success: false,
            message: 'Vuelo no encontrado'
        })
    );
});
