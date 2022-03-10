// 00080000ACDE8C1CACEA7DD0D02D0157B82B40297EDA26D02DCBAB9D00000002

const xrpl = require('xrpl')
const { secret } = require('./env')

const burnToken = async () => {

    // Connect to the devnet server
    const wallet = xrpl.Wallet.fromSeed(secret)
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
    await client.connect()
    console.log("Connected to devnet")

    // Prepare the NFTokenBurn transaction
    const tokenId = '00080000ACDE8C1CACEA7DD0D02D0157B82B40297EDA26D05B974D9F00000004'
    const transactionBlob = {
        "TransactionType": "NFTokenBurn",
        "Account": wallet.classicAddress,
        "TokenID": tokenId
    }

    // Submit the transaction and wait for the results
    const tx = await client.submitAndWait(transactionBlob, { wallet })

    // Request a refreshed list of the current NFTokens, if any
    const nfts = await client.request({
        method: "account_nfts",
        account: wallet.classicAddress
    })

    // Display the results in your console log
    console.log(nfts)
    console.log("Transaction result:", tx.result.meta.TransactionResult)
    console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))

    client.disconnect()
}

burnToken()