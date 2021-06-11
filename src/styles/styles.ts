import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(10),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    cryptoInputBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginTop: 20,
      marginBottom: 20,
    },
    currencyInput: {
      minWidth: "calc(70% - 30px)",
    },
    currencyType: {
      minWidth: "30%",
    },
    table: {
      minWidth: 650,
    },
    currencyIcon: {
      width: 28,
      height: 28,
    },
    redColumn: {
      backgroundColor: "#ffdada",
    },
    greenColumn: {
      backgroundColor: "#d8ffc4",
    },
    rowCurrency: {
        cursor: 'pointer'
    }
  })
)
