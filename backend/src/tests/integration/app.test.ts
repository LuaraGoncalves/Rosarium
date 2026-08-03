import request from 'supertest';
import { app } from '../../main';

describe('Health Check / Base Routes', () => {
  it('should return 200 for health route', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/rota-inexistente');
    expect(response.status).toBe(404);
  });
});
