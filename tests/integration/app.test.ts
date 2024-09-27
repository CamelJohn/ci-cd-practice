import { type Server } from 'node:http';
import webApp, { start } from '../../src/app';
import httpWrapper from 'supertest'

describe('Web app should satisfy following:', () => {
    let server: Server;

    beforeEach(async () => {
        server = start(3000);
    });
    afterEach(async () => {
        if (server) {
            server.close();
        }
    });
    const http = httpWrapper(webApp);

    it('handles non existent routes', async () => {
        const response = await http.get('/non-existent-route');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Not Found');
    });

    it('responds to health checks', async () => {
        const response = await http.get('/health-check');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('OK');
    });
});
