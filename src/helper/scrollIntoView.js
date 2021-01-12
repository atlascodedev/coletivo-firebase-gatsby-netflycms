import { navigate } from "gatsby"
import convertToSlug from "./converToSlug"

const scrollIntoViewHelper = (ref = null, menuName) => {
  console.log(convertToSlug(menuName).toUpperCase())

  if (global.window.location.pathname === "/") {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
  } else {
    navigate("/", {
      state: { value: 3646, restore: true },
    })
  }
}

export default scrollIntoViewHelper
