import React from "react"
import firebase from "firebase/app"
import "firebase/firestore"
import { FirebaseContext } from "./src/context/firebase"
import { CssBaseline, MuiThemeProvider } from "@material-ui/core"
import { navigate } from "gatsby"
import { config as firebaseConfig } from "./config/firebase.config"
import { theme } from "./src/theme"

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
