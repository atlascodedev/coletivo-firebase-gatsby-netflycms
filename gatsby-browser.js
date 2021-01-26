import React from "react"
import { CssBaseline, MuiThemeProvider } from "@material-ui/core"
import { theme } from "./src/theme"
import "@fontsource/barlow"
import "@fontsource/barlow/500.css"
import "@fontsource/barlow/600.css"
import "@fontsource/barlow/700.css"

import "@fontsource/barlow/800.css"
import "@fontsource/barlow/900.css"
require("swiper/swiper.min.css")
require("swiper/components/navigation/navigation.min.css")
require("swiper/components/pagination/pagination.min.css")
require("swiper/components/scrollbar/scrollbar.min.css")
require("swiper/components/effect-fade/effect-fade.min.css")
require("swiper/components/scrollbar/scrollbar.min.css")
require("swiper/components/lazy/lazy.min.css")

const App = ({ root }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>{root}</MuiThemeProvider>
    </React.Fragment>
  )
}

export const wrapRootElement = ({ element }) => <App root={element} />

export const onInitialClientRender = () => {
  window.scroll(0, 0)

  setTimeout(() => {
    document.getElementById("atlas-loader").style.opacity = "0"

    setTimeout(() => {
      document.getElementById("atlas-loader").style.display = "none"
      document.body.style.overflow = "initial"
    }, 500)
  }, 2000)
}
