const xrpl = require('xrpl')
const {wallet} = require('./env')

const mintToken = async () => {
    // Create a wallet and client, then connect to the developer network
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
    await client.connect()
    console.log("Connected to devnet")

    // Create a NFTokenMint transaction using your account address and the URI to your token data
    const tokenUrl = "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi"
    const flags = 8
    const transactionBlob = {
        TransactionType: "NFTokenMint",
        Account: wallet.classicAddress,
        URI: xrpl.convertStringToHex(tokenUrl),
        Flags: flags,
        TokenTaxon: 0
    }

    // Submit the signed transaction blob and wait for the response
    const tx = await client.submitAndWait(transactionBlob, { wallet })

    // Send an account_nfts request to list all NFTokens for your account
    const nfts = await client.request({
        method: "account_nfts",
        account: wallet.classicAddress
    })
    console.log(nfts)

    // Request the transaction results and updates to the account balance
    console.log("Transaction result:", tx.result.meta.TransactionResult)
    console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
    
    client.disconnect()
} //End of mintToken

mintToken()