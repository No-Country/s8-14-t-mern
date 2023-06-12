import axios from 'axios'

type DataCriptoType = {
  name: string
  symbol: string
}
type DataCriptoItemType = DataCriptoType & {
  priceUsd: number
}
type DataCriptoFilterType = DataCriptoType & {
  current_price: number | string
}

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
      const criptoFiltered: DataCriptoFilterType[] = criptos.map(
        (e: DataCriptoItemType) => ({
          name: e.name,
          symbol: e.symbol,
          current_price: e.priceUsd
        })
      )
      const pigmeoCoin = {
        name: 'Pigmeocoin',
        symbol: 'pgc',
        current_price: '33.315156456465456151'
      }

      const allCriptos = criptoFiltered.concat(pigmeoCoin)

      return allCriptos
    }
  } catch (error) {
    throw new Error('error')
  }
}

export { criptoFetch }
