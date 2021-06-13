import express from 'express'
import { config } from 'dotenv'
import logger from 'morgan'

import translation from './translations/en.json'
import { CODE } from './helpers/strings'

config()

const app = express()

app.use(logger('dev'))

if (process.env.MAINTENANCE_MODE == '1') {
  app.all('*', (_, res) =>
    res.json({
      success: false,
      code: CODE.WEBSITE_UNDER_MAINTENANCE,
      message: translation.websiteUnderMaintenance,
    })
  )
}

app.get('/version', (_, res, _2) => {
  return res.json({
    success: true,
    data: {
      version: process.env.CURRENT_VERSION,
    },
  })
})
