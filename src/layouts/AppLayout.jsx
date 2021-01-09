import React from "react"
import Footer from "../components/AppComponents/Footer"
import Navbar from "../components/AppComponents/Navbar"
import WhatsAppButton from "../components/UtilityComponents/WhatsAppButton"
import logo from "../images/coletivo-logo.png"

function AppLayout({ children, refs, menu }) {
  return (
    <React.Fragment>
      <Navbar refs={refs} menu={menu} logo={logo} />

      <main>{children}</main>

      <WhatsAppButton />
      <Footer />
    </React.Fragment>
  )
}

export default AppLayout