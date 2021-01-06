import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Zoom from "@material-ui/core/Zoom"
import { Fab } from "@material-ui/core"
import { KeyboardArrowUp } from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 9999,
  },
}))

export function ScrollTop(props) {
  const { children, window } = props
  const classes = useStyles()
  const trigger = useScrollTrigger()

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    )

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  )
}

const ScrollTopComponent = props => {
  return (
    <ScrollTop {...props}>
      <Fab color="primary" size="small" aria-label="Scrollar para o topo">
        <KeyboardArrowUp />
      </Fab>
    </ScrollTop>
  )
}

export default ScrollTopComponent
