import React from "react"
import { ref } from "yup"
import Footer from "../components/AppComponents/Footer"
import Navbar from "../components/AppComponents/Navbar"
import WhatsAppButton from "../components/UtilityComponents/WhatsAppButton"
import logo from "../images/coletivo-logo.png"

function AppLayout({ children, menu }) {
  const [refScrollY, setRefScrollY] = React.useState([])

  // React.useEffect(() => {
  //   // setRefList(menu)
  //   menu.forEach(menuItem => {
  //     console.log(
  //       menuItem.reference.current.offsetTop + "---" + menuItem.menuName
  //     )
  //   })
  // }, [])

  const menuItemsScrollsPosY = {
    home: 90,
    aboutUs: 640,
    posts: 1540,
    contact: 3646,
  }

  // JSON.stringify(menuItemsScrollsPosY)

  // localStorage.setItem("menuScrollPosY", JSON.stringify(menuItemsScrollsPosY))

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
