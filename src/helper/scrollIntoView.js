import { navigate } from "gatsby"
import convertToSlug from "./converToSlug"
import scrollPolyfill from "./scrollPolyfill"

const scrollIntoViewHelper = (ref = null, menuName, callback = null) => {
  const isChrome = global.window.navigator.userAgent.includes("Chrome")
  const smoothScrollSupport =
    "scrollBehavior" in global.window.document.documentElement.style

  if (global.window.location.pathname === "/") {
    if (isChrome || !smoothScrollSupport) {
      scrollPolyfill(`#${convertToSlug(menuName).toLowerCase()}`)
    } else {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    if (typeof callback == "function" && callback) {
      callback()
    }
  } else {
    navigate("/", {
      state: { value: convertToSlug(menuName).toLowerCase(), restore: true },
    })
  }
}

export default scrollIntoViewHelper
