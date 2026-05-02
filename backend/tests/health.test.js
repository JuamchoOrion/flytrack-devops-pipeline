import request from 'supertest';
import app from '../src/app.js';
import { getDatabase, resetDatabase } from '../src/config/database.js';

beforeAll(() => {
    getDatabase();
});

beforeEach(() => {
    resetDatabase();
});

test('GET /api/health returns ok status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
        expect.objectContaining({
            status: 'ok',
            service: 'flytrack-backend'
        })
    );
});

test('returns 404 for unknown API route', async () => {
    const response = await request(app).get('/api/unknown-route');

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
        expect.objectContaining({
            success: false,
            message: 'Endpoint no encontrado',
            path: '/api/unknown-route'
        })
    );
});
