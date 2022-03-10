const xrpl = require('xrpl')

const address = 'rHrvUdAwNCJKayE5YpTNwjbfFWMn43pWFT'
const secret = 'sshHD9m5X5k7dgaEvMvbA4PMKmyji'

const buyerAddress = 'rPg88PZ5T8kLPY3v4sxCh2ZfwfAbg4rBdP'
const buyerSecret = 'sndtMgJV4J2chbXFY8vxcxHCjTykf'

// const wallet = xrpl.Wallet.fromSeed(buyerSecret)
const wallet = xrpl.Wallet.fromSeed(secret)
const buyerWallet = xrpl.Wallet.fromSeed(buyerSecret)

module.exports = {
    address,
    secret,
    buyerAddress,
    buyerSecret,
    wallet,
    buyerWallet
}