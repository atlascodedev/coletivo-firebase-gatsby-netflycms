import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Slide,
  SvgIcon,
} from "@material-ui/core"
import { CheckCircle, Error, Warning } from "@material-ui/icons"
import React from "react"

const useStyles = makeStyles(theme => ({
  root: {},

  dialogIcon: {
    fontSize: "8em",
    margin: "0.25em 0.5em 0.5em 0.5em",
  },

  dialogTitle: {
    textAlign: "center",
  },

  dialogText: {
    textAlign: "center",
    fontSize: "1.25em",
    fontWeight: 500,
    marginBottom: "1.75em",
  },

  dialogTitleText: {
    fontSize: "1.75em",
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function ConfirmationDialog({ open, dialogClose, message, type, callback }) {
  const classes = useStyles()

  const handleConfirmation = () => {
    if (typeof callback === "function" && callback) {
      callback()
      dialogClose()
    } else {
      dialogClose()
    }
  }

  const messageText = message
    ? message
    : "Placeholder lorem ipsum message pass the MESSAGE prop to this component to replace it"

  const messageTitle =
    type == "success"
      ? "Sucesso"
      : type == "warning"
      ? "Aviso"
      : type == "error"
      ? "Erro"
      : "No type or title was supplied"

  const confirmationDialogType =
    type == "success" ? (
      <CheckCircle style={{ color: "green" }} />
    ) : type == "warning" ? (
      <Warning style={{ color: "#f5cb10" }} />
    ) : type == "error" ? (
      <Error style={{ fill: "#c31e1e" }} />
    ) : (
      "Dialog type was not provided"
    )

  return (
    <div>
      <Dialog
        TransitionComponent={Transition}
        onClose={dialogClose}
        open={open}
      >
        <DialogTitle className={classes.dialogTitle}>
          <Box className={classes.dialogTitleText}>{messageTitle}</Box>
        </DialogTitle>
        <DialogContent dividers>
          <Container>
            <Grid container justify="center">
              <Grid item container justify="center">
                <SvgIcon className={classes.dialogIcon}>
                  {confirmationDialogType}
                </SvgIcon>
              </Grid>

              <Grid item container justify="center">
                <Box className={classes.dialogText}>{messageText}</Box>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose} color="primary" variant="outlined">
            Cancelar
          </Button>

          <Button
            onClick={handleConfirmation}
            color="primary"
            variant="contained"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmationDialog
