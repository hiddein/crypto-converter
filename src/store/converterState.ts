import { makeAutoObservable } from "mobx"
import { ICoin, ISelectedCoin } from "../types/types"

class ConverterState {
  private selectedCoin: ISelectedCoin = {
    name: '',
    price: 0
  }

  constructor() {
    makeAutoObservable(this)
  }

  getSelected() {
    return this.selectedCoin
  }

  setSelected(coin: ICoin) {
    this.selectedCoin = {
      price: coin.price,
      name: coin.name
    }
  }


}

export default new ConverterState()