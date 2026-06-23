import { app } from '../../main';
import { env } from '../../config/env';

app.listen(env.PORT, () => {
  console.log(`🚀 Server rodando na porta ${env.PORT}`);
});
