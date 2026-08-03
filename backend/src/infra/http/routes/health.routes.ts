import { Router } from 'express';

const healthRoutes = Router();

healthRoutes.get('/', (_req, res) => {
  return res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default healthRoutes;
