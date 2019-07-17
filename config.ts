import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const env = process.env.NODE_ENV || 'development'

const config = {
  env: env,
  isProduction: env.toLowerCase() === 'production',
  isDev: env.toLowerCase() === 'development',
  isTest: env.toLowerCase() === 'test',
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT),
  dbUser: process.env.DB_USER,
  dbToken: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: parseInt(process.env.SMTP_PORT),
  smtpUser: process.env.SMTP_USER,
  smtpToken: process.env.SMTP_PASSWORD,
  recordPrefix: 'https://linkstats.cc/redirect.html',
  activePrefix: 'https://linkstats.cc/login',
  resetPrefix: 'https://linkstats.cc/reset',
  productName: 'LinkStats',
}

export default config
