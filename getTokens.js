const xrpl = require('xrpl')
const { wallet } = require('./env')

const getTokens = async () => {
    // Connect to the devnet server.
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
    await client.connect()
    console.log("Connected to devnet")

    // Request account_nfts for your wallet account.
    const nfts = await client.request({
        method: "account_nfts",
        account: wallet.classicAddress
    })

    // Display the results in your console log
    console.log("Account : ", nfts.result.account)
    console.log('\n')

    nfts.result.account_nfts.forEach(nft => {
        console.log("NFT serial : ", nft.nft_serial)
        console.log("Issuer     : ", nft.Issuer)
        console.log("Token ID   : ", nft.TokenID)
        console.log('\n')
    })

    // Disconnect from server
    client.disconnect()
}

getTokens()