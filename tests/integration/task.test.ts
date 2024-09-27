import { type Server } from 'node:http';
import webApp, { start } from '../../src/app';
import httpWrapper from 'supertest'

describe('Task module should satisfy the following:', () => {
    let server: Server;

    beforeAll(async () => {
        server = start(3000);
    });
    afterAll(async () => {
        if (server) {
            server.close();
        }
    });
    const http = httpWrapper(webApp); 

    it('returns a list of empty tasks', async () => {
        const response = await http.get('/api/v1/task');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('creates a new task', async () => {
        const response = await http.post('/api/v1/task').send({ task: { name: 'test'} });
        expect(response.status).toBe(201);
        expect(response.body.name).toEqual('test');
    });

    it('returns a list with one task', async () => {
        const response = await http.get('/api/v1/task');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    it('updates a task', async () => {
        const taskListResponse = await http.get('/api/v1/task');
        const taskListResposneBody = taskListResponse.body;
        const [task] = taskListResposneBody;
        const taskId = task.id;

        const response = await http.patch(`/api/v1/task/${taskId}`).send({ task: { name: 'test2'} });
        expect(response.status).toBe(204);
    });

    it('removes a task', async () => {
        const taskListResponse = await http.get('/api/v1/task');
        const taskListResposneBody = taskListResponse.body;
        const [task] = taskListResposneBody;
        const taskId = task.id;
    
        const response = await http.delete(`/api/v1/task/${taskId}`);
        expect(response.status).toBe(204);
    });

    it('returns a list of empty tasks', async () => {
        const response = await http.get('/api/v1/task');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});