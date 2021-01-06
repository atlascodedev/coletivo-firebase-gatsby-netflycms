import React, { useContext, useEffect } from "react"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

export default function SnackError(props) {
  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState([])

  useEffect(() => {
    if (props.error[0]) {
      setError(props.error[0])
      setOpen(true)
    }
  }, [props.error])

  const testSnack = () => {
    setError(["ASS"])
  }

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  return (
    <div>
      {/* <Button onClick={testSnack} variant="contained" color="default">
        Test error message
      </Button> */}

      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        message={error}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  )
}
