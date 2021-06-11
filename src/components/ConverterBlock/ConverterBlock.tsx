import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Select from "@material-ui/core/Select"
import { Paper } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import { InputLabel, MenuItem } from "@material-ui/core"
import { observer } from "mobx-react-lite"
import currenciesState from "../../store/currenciesState"
import converterState from "../../store/converterState"

interface IConverterBlock {
  classes: any
}

interface IReducerState {
  value1: string
  value2: string
  inPrice: number
  outPrice: number
}
function reducer(state: IReducerState, action: any): IReducerState {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        value2: String((Number(action.payload.value) * state.inPrice) / state.outPrice),
      };

    case 'SET_PRICES':
      return {
        ...state,
        inPrice: action.payload.in,
        outPrice: action.payload.out,
      };

    default:
      return state;
  }
}

export const ConverterBlock: React.FC<IConverterBlock> = observer(
  ({ classes }) => {
    const coins: String[] = currenciesState.getItems().map((coin) => coin.name)
    const [selectedOut, setSelectedOut] = useState('')
    const inPrice = Number(converterState.getSelected().price) || 0;
    const outPrice =
      Number(currenciesState.getItems().find(obj => obj.name === selectedOut)?.price) || 0;
    const [state, dispatch] = React.useReducer(reducer, {
      value1: '',
      value2: '',
      inPrice,
      outPrice,
    });

    React.useEffect(() => {
      dispatch({
        type: 'SET_PRICES',
        payload: {
          in: inPrice,
          out: outPrice,
        },
      });
    }, [inPrice, outPrice]);

    const onUpdateField = (name: string, value: string) => {
      dispatch({
        type: 'SET_VALUE',
        payload: {
          name,
          value,
        },
      });
    };

    return (
      <Paper className={classes.paper}>
        <div className={classes.cryptoInputBox}>
          <FormControl className={classes.currencyInput}>
            <TextField
              type="number"
              value={state.value1}
              onChange={(e: any) => onUpdateField('value1', e.target.value)}
              label="Сумма"
            />
          </FormControl>
          <FormControl className={classes.currencyType}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Валюта
            </InputLabel>
            <Select value={converterState.getSelected().name || ''}>
              {coins.map((name:any) => (
                <MenuItem value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.cryptoInputBox}>
          <FormControl className={classes.currencyInput}>
            <TextField type="number" value={state.value2} label="Сумма" />
          </FormControl>
          <FormControl className={classes.currencyType}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Валюта
            </InputLabel>
            <Select
              onChange={e => setSelectedOut(e.target.value as string)}
              value={selectedOut}>
              {coins.map((name:any) => (
                <MenuItem value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Paper>
    )
  }
)
