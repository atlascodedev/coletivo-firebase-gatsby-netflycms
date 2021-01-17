import React from "react"
import firebase from "firebase/app"
import "firebase/firestore"
import { FirebaseContext } from "./src/context/firebase"
import { CssBaseline, MuiThemeProvider } from "@material-ui/core"
import { config as firebaseConfig } from "./config/firebase.config"
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

const app = firebase.initializeApp(firebaseConfig)

const firestore = app.firestore()
const firestoreNamespace = firebase.firestore

if (process.env.NODE_ENV !== "production") {
  firestore.useEmulator("localhost", 8080)

  console.log(
    "Warning, you're running a local instance of Firestore, data will not be persisted to the production database"
  )
}

const App = ({ root }) => {
  return (
    <FirebaseContext.Provider value={{ app, firestore }}>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>{root}</MuiThemeProvider>
    </FirebaseContext.Provider>
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
