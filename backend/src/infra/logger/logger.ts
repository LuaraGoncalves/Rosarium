import pino from 'pino';

const isTest = process.env.NODE_ENV === 'test';
const isProd = process.env.NODE_ENV === 'production';

const transport =
  !isProd && !isTest
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          singleLine: true,
        },
      }
    : undefined;

export const logger = pino({
  level: isTest ? 'silent' : 'info',
  base: {
    service: 'rosarium-backend',
  },
  transport,
});
