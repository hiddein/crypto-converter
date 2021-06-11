import React, { useEffect } from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { ICoin, ICoinDiff } from "../../types/types"
import { Paper } from "@material-ui/core"
import { observer } from "mobx-react-lite"
import currenciesState from "../../store/currenciesState"
import converterState from "../../store/converterState"

interface ICryptoTable {
  classes: any
}

export const CryptoTable: React.FC<ICryptoTable> = observer(({ classes }) => {
  const items: ICoin[] = currenciesState.getItems()
  const diffObj: ICoinDiff = currenciesState.getDiffObj()

  useEffect(() => {
    currenciesState.fetchItems()
    setInterval(() => {
      currenciesState.fetchItems()
    }, 30 * 1000)
  }, [])

  const onClickRow = (coin: ICoin) => {
      converterState.setSelected(coin)
  }

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="left">FullName</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">volume24hour</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!items.length
            ? "Загрузка..."
            : items.map((row: ICoin) => (
                <TableRow onClick={()=> onClickRow(row)} className={classes.rowCurrency} hover key={row.name}>
                  <TableCell component="th" scope="row">
                    <img
                      className={classes.currencyIcon}
                      src={row.imageURL}
                      alt="logo"
                    />
                  </TableCell>
                  <TableCell align="left">{row.fullName}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell
                    className={
                      diffObj[row.name] && classes[`${diffObj[row.name]}Column`]
                    }
                    align="left"
                  >
                    ${row.price}
                  </TableCell>
                  <TableCell align="left">${row.volume24}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
