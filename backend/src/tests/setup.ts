// Ambiente minimo para testes que importam o app sem depender de secrets reais do CI.
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/rosarium_test?schema=public';
process.env.FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret';
