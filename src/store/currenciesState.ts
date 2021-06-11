import axios from "axios"
import { makeAutoObservable } from "mobx"
import { ICoin, ICoinDiff } from "../types/types"
import converterState from "./converterState"

class CurrenciesState {
  private items: ICoin[] = []
  private diffObj = {}

  constructor() {
    makeAutoObservable(this)
  }

  setItems(items: ICoin[]) {
    this.items = items
  }

  setDiff(diffObj: any) {
    this.diffObj  = diffObj 
  }

  getItems() {
    return this.items
  }

  getDiffObj() {
    return this.diffObj
  }

  fetchItems() {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
      )
      .then(({ data }) => {
        const coins: ICoin[] = data.Data.map((coin: any): ICoin => {
          return {
            name: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            imageURL: `https://cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
            price: coin.RAW.USD.PRICE.toFixed(2),
            volume24: coin.RAW.USD.VOLUME24HOUR.toFixed(2),
          }
        })

        this.setDiff(this.diffCurrencies(this.items, coins).reduce(
          (initObj: ICoinDiff, obj: ICoin) => {
            const newObj: ICoin = coins.find((o) => o.name === obj.name)!
            const oldObj: ICoin = this.items.find(
              (itemObj) => itemObj.name === newObj.name
            )!
            const color: string =
              newObj.price === oldObj.price
                ? ""
                : newObj.price > oldObj.price
                ? "green"
                : "red"

            initObj[newObj.name] = color

            return initObj
          },
          {}
        ))
        this.setItems(coins)
        converterState.setSelected(coins[0]);
      })
  }
  diffCurrencies(arr1: ICoin[], arr2: ICoin[]) {
    return arr1.filter((obj, index) => {
      return obj.price !== arr2[index].price ? true : false
    })
  }
}

export default new CurrenciesState()
