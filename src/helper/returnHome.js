import { navigate } from "gatsby"

const returnHome = () => {
  try {
    if (global.window.location.pathname === "/") {
      global.window.scrollTo(0, 0)
    } else {
      navigate("/")
      setTimeout(() => {
        global.window.scrollTo(500, 500)
      }, 1500)
    }
  } catch (error) {
    console.log(error)
  }
}

export default returnHome
