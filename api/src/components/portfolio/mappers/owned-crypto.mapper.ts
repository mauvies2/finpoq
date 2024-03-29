import { ICrypto, IOwnedCrypto, ITransaction } from 'finpoq-core/types'

export const formatNewOwnedCrypto = (crypto: ICrypto, transaction: ITransaction): IOwnedCrypto => ({
  _id: crypto._id,
  name: crypto.name,
  symbol: crypto.symbol,
  logoUrl: crypto.logoUrl,
  slug: crypto.slug,
  transactions: [transaction],
})
