import { app } from '../../main';
import { env } from '../../config/env';
import { logger } from '@/infra/logger/logger';

app.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, 'server running');
});
