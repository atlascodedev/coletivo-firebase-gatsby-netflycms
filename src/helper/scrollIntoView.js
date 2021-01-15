import { navigate } from "gatsby"
import convertToSlug from "./converToSlug"

const scrollIntoViewHelper = (ref = null, menuName, callback = null) => {
  console.log(convertToSlug(menuName).toUpperCase())

  if (global.window.location.pathname === "/") {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" })

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
