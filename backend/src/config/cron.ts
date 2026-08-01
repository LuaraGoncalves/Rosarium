import cron from 'node-cron';
import { spawn } from 'child_process';
import path from 'path';
import { logger } from '@/infra/logger/logger';

export function setupCronJobs() {
  logger.info('configuring cron jobs');

  cron.schedule(
    '5 0 * * *',
    () => {
      logger.info('running daily santo do dia update');

      const scriptPath = path.resolve(__dirname, '../../scripts/update-santo-do-dia.ts');

      const child = spawn('npx', ['tsx', scriptPath], {
        stdio: 'inherit',
        shell: true,
      });

      child.on('close', (code) => {
        logger.info({ code }, 'daily update finished');
      });

      child.on('error', (err) => {
        logger.error({ err }, 'failed to run daily update');
      });
    },
    {
      timezone: 'America/Sao_Paulo',
    }
  );
}
