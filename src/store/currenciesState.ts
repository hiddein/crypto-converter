import axios from "axios"
import { makeAutoObservable } from "mobx"
import { ICoin } from "../types/types"

class CurrenciesState {
  private items: ICoin[] = []

  constructor() {
    makeAutoObservable(this)
  }

  getItems() {
   return this.items
  }

  fetchItems() {
    axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
    .then(({ data })=>{
      const coins:ICoin[] = data.Data.map( (coin:any): ICoin => {
        return {
          name: coin.CoinInfo.Name,
          fullName: coin.CoinInfo.FullName,
          imageURL: `https://cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
          price: coin.RAW.USD.PRICE.toFixed(2),
          volume24: coin.RAW.USD.VOLUME24HOUR.toFixed(2)
        }
      })
      this.items = coins
     })
  }
}

export default new CurrenciesState()
