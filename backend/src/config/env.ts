import path from 'node:path'
import { config } from 'dotenv'
import { z } from 'zod'

const envFileByNodeEnv: Record<string, string> = {
  development: '.env.local',
  production: '.env.production',
  test: '.env.test',
}

const nodeEnv = process.env.NODE_ENV || 'development'
const envFile = process.env.ENV_FILE || envFileByNodeEnv[nodeEnv] || '.env.local'

config({ path: path.resolve(process.cwd(), envFile) })

if (nodeEnv !== 'production') {
  config({ path: path.resolve(process.cwd(), '.env'), override: false })
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatória.'),
  FRONTEND_URL: z.string().url().optional(),
  JWT_SECRET: z.string().optional(),
  JWT_EXPIRES_IN: z.string().default('7d'),
})

export const env = envSchema.parse(process.env)
