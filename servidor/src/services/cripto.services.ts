import axios from 'axios'

const criptoFetch = async () => {
  try {
    const btc = await axios.get('https://api.coincap.io/v2/assets/bitcoin')
    const eth = await axios.get('https://api.coincap.io/v2/assets/ethereum')
    const doge = await axios.get('https://api.coincap.io/v2/assets/dogecoin')
    const bnb = await axios.get('https://api.coincap.io/v2/assets/binance-coin')

    const criptos = []
    criptos.push(btc.data.data)
    criptos.push(eth.data.data)
    criptos.push(doge.data.data)
    criptos.push(bnb.data.data)

    if (criptos) {
      let criptoFiltered = criptos.map(
        (e: { name: any; symbol: any; priceUsd: any }) => ({
          name: e.name,
          symbol: e.symbol,
          current_price: e.priceUsd
        })
      )
      let pigmeoCoin = {
        name: 'Pigmeocoin',
        symbol: 'pgc',
        current_price: '33.315156456465456151'
      }

      let allCriptos = criptoFiltered.concat(pigmeoCoin)

      return allCriptos
    }
  } catch (error) {

    throw new Error('error')
  }
}

export { criptoFetch }
