import { ICrypto, IOwnedCrypto, ITransaction } from 'finpok-core/domain'

export const formatNewOwnedCrypto = (crypto: ICrypto, transaction: ITransaction): IOwnedCrypto => ({
  _id: crypto._id,
  name: crypto.name,
  symbol: crypto.symbol,
  slug: crypto.slug,
  amount: transaction.amount,
  buyAvgPrice: transaction.price,
  transactions: [transaction],
})
