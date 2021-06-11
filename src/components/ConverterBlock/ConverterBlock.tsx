import React from "react"
import TextField from "@material-ui/core/TextField"
import Select from "@material-ui/core/Select"
import { Paper } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import { InputLabel, MenuItem, Typography } from "@material-ui/core"


interface IConverterBlock {
    classes: any
}

export const ConverterBlock: React.FC<IConverterBlock> = ( { classes } ) => {

    return (
        <Paper className={classes.paper}>
            <div className={classes.cryptoInputBox}>
              <FormControl className={classes.currencyInput}>
                <TextField fullWidth label="Сумма" />
              </FormControl>
              <FormControl className={classes.currencyType}>
                <InputLabel
                  shrink
                  id="demo-simple-select-placeholder-label-label"
                >
                  Валюта
                </InputLabel>
                <Select value={10}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.cryptoInputBox}>
              <FormControl className={classes.currencyInput}>
                <TextField fullWidth label="Сумма" />
              </FormControl>
              <FormControl className={classes.currencyType}>
                <InputLabel
                  shrink
                  id="demo-simple-select-placeholder-label-label"
                >
                  Валюта
                </InputLabel>
                <Select value={10}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Typography variant="h5" component="h5">
              h1. Heading
            </Typography>
          </Paper>
    )
}
