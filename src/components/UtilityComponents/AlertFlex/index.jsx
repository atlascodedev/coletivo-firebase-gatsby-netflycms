import { Slide, Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React from "react"

function AlertFlex({ open, handleClose, severity, message, autoHideDuration }) {
  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose ? handleClose : null}
        autoHideDuration={autoHideDuration}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}
      >
        <Alert elevation={6} severity={severity ? severity : "success"}>
          {message ? message : "Placeholder message"}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AlertFlex
