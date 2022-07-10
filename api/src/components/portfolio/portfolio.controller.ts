import { Request, RequestHandler, Response } from 'express'
import Crypto from '../cryptos/Crypto'
import { UserModel } from '../users/User'
import { OwnedCryptoModel } from '../ownedAssets/OwnedCrypto'
import { formatTransaction } from '../transactions/Transaction'
import { addAssetOrTransaction, updateCryptoTransaction } from './portfolio.engine'
import { formatNewOwnedCrypto } from '../ownedAssets/ownedAssets.engine'
import {
  IPortfolio,
  TransacionPayload,
  RemoveTransactionPayload,
  IOwnedCrypto,
  EditTransactionPayload,
} from 'finpoq-core/types'

export const getPortfolio: RequestHandler = async (req: Request, res: Response) => {
  const { portfolio }: { portfolio: IPortfolio } = req.body.user.toObject()

  if (!portfolio.cryptocurrencies) {
    return res.status(200).json({ status: 200, msg: 'portfolio', data: {} })
  }

  try {
    const cryptos = await Crypto.find()
    const cryptocurrencies = portfolio.cryptocurrencies.map((ownedCrypto) => {
      const crypto = cryptos.find((crypto) => ownedCrypto.symbol === crypto.symbol)
      if (!crypto) return null

      portfolio.total += crypto.quote.USD.price * ownedCrypto.amount

      return {
        _id: ownedCrypto._id,
        name: ownedCrypto.name,
        symbol: ownedCrypto.symbol,
        slug: ownedCrypto.slug,
        logoUrl: crypto.logoUrl,
        amount: ownedCrypto.amount,
        buyAvgPrice: ownedCrypto.buyAvgPrice,
        transactions: ownedCrypto.transactions,
        price: {
          current: crypto.quote.USD.price,
          change24h: crypto.quote.USD.percent_change_24h,
        },
      }
    })

    const portfolioResource = {
      total: portfolio.total,
      cryptocurrencies,
    }

    console.log({ domain: 'Api', msg: 'Portfolio' })
    return res.status(200).json({ status: 200, msg: 'portfolio', data: portfolioResource })
  } catch (error) {
    console.error({ domain: 'Api', error })
    return res.status(200).json({ status: 500, msg: 'Server error' })
  }
}

export const addTransaction: RequestHandler = async (req: Request, res: Response) => {
  const { type, symbol, amount, price, notes, fee, time }: TransacionPayload = req.body
  const { user }: { user: UserModel } = req.body

  try {
    const crypto = await Crypto.findOne({ symbol })
    const transaction = formatTransaction(type, amount as number, price as number, notes, fee as number, time)
    const newOwnedCrypto: IOwnedCrypto = formatNewOwnedCrypto(crypto, transaction)

    addAssetOrTransaction(user, newOwnedCrypto, transaction)
    await user.save()

    console.log({ domain: 'Api', msg: 'Transaction was successfully added to portfolio' })
    return res.json({ status: 200, msg: 'Transaction was successfully added to portfolio' })
  } catch (error) {
    console.error({ status: 500, error: error.message })
    return res.json({ status: 500, error: 'Server error' })
  }
}

export const updateTransaction: RequestHandler = async (req: Request, res: Response) => {
  const editTransactionPayload: EditTransactionPayload = req.body
  const { user }: { user: UserModel } = req.body

  try {
    updateCryptoTransaction(user, editTransactionPayload)
    await user.save()

    console.log({ domain: 'Api', msg: 'Transaction was successfully updated' })
    return res.json({ status: 200, msg: 'Transaction was successfully updated' })
  } catch (error) {
    console.error({ status: 500, error })
    return res.json({ status: 500, error })
  }
}

export const removeTransaction: RequestHandler = async (req: Request, res: Response) => {
  const { cryptoSymbol, transactionId }: RemoveTransactionPayload = req.body
  const { user }: { user: UserModel } = req.body

  let amount = 0
  let price = 0

  try {
    user.portfolio.cryptocurrencies.forEach((cryptocurrency: OwnedCryptoModel) => {
      if (cryptocurrency.symbol === cryptoSymbol) {
        cryptocurrency.transactions.forEach((transaction) => {
          if (JSON.stringify(transaction._id) !== JSON.stringify(transactionId)) {
            amount += transaction.amount
            price += transaction.price
          }
        })

        cryptocurrency.transactions.pull(transactionId)

        cryptocurrency.amount = amount
        cryptocurrency.buyAvgPrice = price / cryptocurrency.transactions.length || 0
      }
    })

    await user.save()

    console.log({ domain: 'Api', msg: 'Transaction was successfully removed from portfolio' })
    return res.json({ status: 200, msg: 'Transaction was successfully removed from portfolio' })
  } catch (error) {
    console.error({ status: 500, error })
    return res.json({ status: 500, error })
  }
}

export const removeCrypto: RequestHandler = async (req: Request, res: Response) => {
  const { user }: { user: UserModel } = req.body
  try {
    user.portfolio.cryptocurrencies.pull(req.params.id)
    await user.save()

    console.log({ domain: 'Api', msg: 'Cryptorrency was successfully removed from portfolio' })
    return res.json({ status: 200, msg: 'Cryptorrency was successfully removed from portfolio' })
  } catch (error) {
    console.error({ status: 500, error })
    return res.json({ status: 500, error })
  }
}
