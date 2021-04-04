import React from "react"
import Footer from "../components/AppComponents/Footer"
import Navbar from "../components/AppComponents/Navbar"
import logo from "../images/pro-cidadania-logo.svg"

function AppLayout({ children, menu }) {
  return (
    <React.Fragment>
      <Navbar menu={menu} logo={logo} />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  )
}

export default AppLayout
