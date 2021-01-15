import { navigate } from "gatsby"

const returnHome = () => {
  try {
    if (global.window.location.pathname === "/") {
      global.window.scrollTo(0, 0)
    } else {
      navigate("/")
    }
  } catch (error) {
    console.log(error)
  }
}

export default returnHome
