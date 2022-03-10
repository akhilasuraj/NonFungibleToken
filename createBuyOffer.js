const xrpl = require('xrpl')
const { wallet, buyerWallet} = require('./env')

const createBuyOffer = async () => {
    // Connect to the devnet server
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
    await client.connect()
    console.log("Connected to devnet")

    // Prepare a transaction blob
    const tokenId = '00080000AFAE6C14DF8A28EFA225DE5E4D0609065F67211F0000099B00000000'
    const amount = '15000000'
    const flags = 0
    const transactionBlob = {
        "TransactionType": "NFTokenCreateOffer",
        "Account": buyerWallet.classicAddress,
        "Owner": wallet.classicAddress,
        "TokenID": tokenId,
        "Amount": amount,
        "Flags": flags
    }

    //   Submit the transaction and wait for the results
    const tx = await client.submitAndWait(transactionBlob, { wallet })

    // Display the results in your console log
    console.log("Transaction result:",
        JSON.stringify(tx.result.meta.TransactionResult, null, 2))
    console.log("Balance changes:",
        JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))

    client.disconnect()
}
createBuyOffer()