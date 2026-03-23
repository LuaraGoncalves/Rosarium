import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import routes from '@/infra/http/routes'
import { errorHandler } from '@/shared/middlewares/errorHandler'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import { setupCronJobs } from './config/cron'

const app = express()

setupCronJobs()

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.use(errorHandler)


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export { app }
