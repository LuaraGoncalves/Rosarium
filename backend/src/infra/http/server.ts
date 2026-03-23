import { app } from '../../main'
import { env } from '../../config/env'

const PORT = process.env.PORT || 3001

app.listen(env.PORT, () => {
  console.log(`🚀 Server rodando na porta ${env.PORT}`)
})