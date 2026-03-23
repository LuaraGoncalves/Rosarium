import request from 'supertest';
import { app } from '../../main';

describe('Health Check / Base Routes', () => {
  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/rota-inexistente');
    expect(response.status).toBe(404);
  });
});