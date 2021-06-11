import { useEffect, useState } from "react"
import axios from "axios"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { ICoin } from "./types/types"
import { CryptoTable } from "./components/CryptoTable/CryptoTable"
import { ConverterBlock } from "./components/ConverterBlock/ConverterBlock"
import { useStyles } from './styles/styles' 

const App:React.FC = () => {
  const classes = useStyles()
  const [allCoins, setAllCoins] = useState<ICoin[]>([])

  useEffect(() => {
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
    setAllCoins(coins)
   })
  }, [])

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <CryptoTable items={allCoins} classes={classes} />
        </Grid>

        <Grid item xs={4}>
          <ConverterBlock classes={classes} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
