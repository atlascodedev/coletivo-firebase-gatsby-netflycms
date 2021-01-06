import React from "react"
import { useScrollTrigger, Slide } from "@material-ui/core"

function HideOnScroll(props) {
  const { children, window } = props
  const trigger = useScrollTrigger()

  return (
    <Slide
      timeout={{ enter: 250, exit: 250 }}
      appear={false}
      direction="down"
      in={!trigger}
    >
      {children}
    </Slide>
  )
}

export default HideOnScroll
