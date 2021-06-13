import { Sequelize, Dialect, Model } from 'sequelize'
import { config as environmentConfig } from 'dotenv'
import fs from 'fs'
import path from 'path'

environmentConfig()

import databaseConfig from '../config/config'

const environment =
  (process.env.NODE_ENV as 'development' | 'production' | 'test') ||
  'development'

const config = databaseConfig[environment]

const sequelize = new Sequelize(
  config.database as string,
  config.username as string,
  config.password as string,
  {
    username: config.username,
    password: config.password,
    host: config.host,
    dialect: config.dialect as Dialect,
    logging: console.log,
    define: {
      timestamps: false,
    },
  }
)
const db = {
  sequelize,
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === '.ts'
    )
  })
  .forEach(async (file) => {
    const model: Model = await import(file)
    // @ts-ignore
    db[model.name] = model
  })

export default sequelize
