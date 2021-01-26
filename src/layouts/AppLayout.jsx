import React from "react"
import Footer from "../components/AppComponents/Footer"
import Navbar from "../components/AppComponents/Navbar"

function AppLayout({ children, menu }) {
  return (
    <React.Fragment>
      <Navbar menu={menu} logo={null} />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  )
}

export default AppLayout
