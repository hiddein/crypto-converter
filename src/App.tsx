import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { CryptoTable } from "./components/CryptoTable/CryptoTable"
import { ConverterBlock } from "./components/ConverterBlock/ConverterBlock"
import { useStyles } from './styles/styles' 


const App:React.FC = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <CryptoTable classes={classes} />
        </Grid>

        <Grid item xs={4}>
          <ConverterBlock classes={classes} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
