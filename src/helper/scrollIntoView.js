import { navigate } from "gatsby"
import convertToSlug from "./converToSlug"

const isChrome = global.window.navigator.userAgent.includes("Chrome")

const scrollIntoViewHelper = (ref = null, menuName, callback = null) => {
  console.log(convertToSlug(menuName).toUpperCase())

  if (global.window.location.pathname === "/") {
    if (isChrome) {
      ref.current.scrollIntoView()
    } else {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    if (typeof callback !== null && callback) {
      callback()
    }
  } else {
    navigate("/", {
      state: { value: convertToSlug(menuName).toLowerCase(), restore: true },
    })
  }
}

export default scrollIntoViewHelper
