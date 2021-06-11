import { makeAutoObservable } from "mobx"

class ConverterState {


  constructor() {
    makeAutoObservable(this)
  }

}

export default new ConverterState()