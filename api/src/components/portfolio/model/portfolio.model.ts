import { Schema } from 'mongoose'
import { IPortfolio } from 'finpoq-core/types'
import { ownedCryptoSchema } from './owned-crypto.model'

export const portfolioSchema = new Schema<IPortfolio>(
  {
    currency: {
      type: [],
      default: undefined,
    },
    business: {
      type: [],
      default: undefined,
    },
    realState: {
      type: [],
      default: undefined,
    },
    bonds: {
      type: [],
      default: undefined,
    },
    stocks: {
      type: [],
      default: undefined,
    },
    commodities: {
      type: [],
      default: undefined,
    },
    cryptocurrencies: {
      type: [ownedCryptoSchema],
      default: [],
    },
    other: {
      type: [],
      default: undefined,
    },
  },
  { _id: false }
)
