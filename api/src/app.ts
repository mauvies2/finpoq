import * as path from 'path'
import moduleAlias from 'module-alias'

moduleAlias.addAliases({
  finpoq: __dirname,
  'finpoq-core': path.join(__dirname, '../..', 'core/src'),
})

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import router from './routes/index'
import { updateCryptosPrice } from './components/cryptos/cryptos.engine'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

setInterval(() => updateCryptosPrice(), 1000 * 300) // 25 min

export default app
