import React from "react"
import { ref } from "yup"
import Footer from "../components/AppComponents/Footer"
import Navbar from "../components/AppComponents/Navbar"
import WhatsAppButton from "../components/UtilityComponents/WhatsAppButton"
import logo from "../images/coletivo-logo.png"

function AppLayout({ children, menu }) {
  return (
    <React.Fragment>
      <Navbar menu={menu} logo={logo} />

      <main>{children}</main>
      {/* <WhatsAppButton /> */}
      <Footer />
    </React.Fragment>
  )
}

export default AppLayout
