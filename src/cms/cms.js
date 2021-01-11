import CMS from "netlify-cms-app"

const tryMe = () => {
  try {
    // document.querySelector(".e4hp3ji4").innerText = "Fazer login"
    document.querySelector(".ei6fm2r0").innerHTML = "<p> </p>"

    // window.addEventListener("hashchange", () => {
    //   document
    //     .querySelector(".css-1u5l62d-button-dropdownItem-StyledMenuItem")
    //     .addEventListener("click", () => {
    //       window.location.assign("/")
    //     })
    // })  
  } catch (error) {
    setTimeout(() => {
      tryMe()
    }, 1)
  }
}

tryMe()
