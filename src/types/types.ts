export interface ICoin {
    name: string,
    fullName: string,
    imageURL: string,
    price: number,
    volume24: number
  }
  
  
export interface ICoinDiff {
  [key: string]: string
}

export type ISelectedCoin = {
  name: string;
  price: number;
};