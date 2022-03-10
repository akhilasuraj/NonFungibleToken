const xrpl = require('xrpl')

const checkOffers = async () => {

    const tokenId = '00080000AFAE6C14DF8A28EFA225DE5E4D0609065F67211F0000099B00000000'

    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
    await client.connect()
    console.log("Connected to devnet")
    
    // Request lists of current Sell Offers and Buy Offers
    console.log("***Sell Offers***")
    let nftSellOffers
    try {
        nftSellOffers = await client.request({
            method: "nft_sell_offers",
            tokenid: tokenId
        })
    } catch (err) {
        console.log("No sell offers.")
    }
    console.log(JSON.stringify(nftSellOffers, null, 2))
    console.log("***Buy Offers***")
    let nftBuyOffers
    try {
        nftBuyOffers = await client.request({
            method: "nft_buy_offers",
            tokenid: tokenId
        })
    } catch (err) {
        console.log("No buy offers.")
    }
    console.log(JSON.stringify(nftBuyOffers, null, 2))

    client.disconnect()
}

checkOffers()