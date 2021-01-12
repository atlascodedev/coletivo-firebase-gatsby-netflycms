import { navigate } from "gatsby"

const scrollIntoViewHelper = (ref = null) => {
  try {
    if (global.window.location.pathname === "/") {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      navigate("/")
    }
  } catch (error) {
    console.log(error)
  }
}

export default scrollIntoViewHelper
