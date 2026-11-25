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

  it('should return rosary prayers and mysteries', async () => {
    const response = await request(app).get('/api/rosario');

    expect(response.status).toBe(200);
    expect(response.body.oracoes.length).toBeGreaterThan(0);
    expect(response.body.misterios.length).toBe(4);
    expect(response.body.misterioHoje).toHaveProperty('slug');
  });
});
