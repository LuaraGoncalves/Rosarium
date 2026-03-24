import cron from 'node-cron';
import { spawn } from 'child_process';
import path from 'path';

export function setupCronJobs() {
  console.log('⏳ Configurando Cron Jobs...');

  cron.schedule(
    '5 0 * * *',
    () => {
      console.log('🔄 Executando tarefa diária: Atualização do Santo do Dia');

      const scriptPath = path.resolve(__dirname, '../../scripts/update-santo-do-dia.ts');

      const child = spawn('npx', ['tsx', scriptPath], {
        stdio: 'inherit',
        shell: true,
      });

      child.on('close', (code) => {
        console.log(`✅ Atualização finalizada com código ${code}`);
      });

      child.on('error', (err) => {
        console.error('❌ Erro ao executar script de atualização:', err);
      });
    },
    {
      timezone: 'America/Sao_Paulo',
    }
  );
}
