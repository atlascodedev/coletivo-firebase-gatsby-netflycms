import React from "react"
import AppLayout from "../layouts/AppLayout"
import _ from "lodash"
import LandingHero from "../components/AppComponents/LandingHero"

function IndexPage(props) {
  const landingRef = React.useRef(null)
  const benefitsRef = React.useRef(null)
  const courseRef = React.useRef(null)
  const contactRef = React.useRef(null)

  const menu = [
    {
      menuName: "Home",
      reference: landingRef,
    },

    {
      menuName: "Benefícios",
      reference: benefitsRef,
    },

    {
      menuName: "Cursos",
      reference: courseRef,
    },

    {
      menuName: "Contato",
      reference: contactRef,
    },
  ]

  const pageRefs = [landingRef, benefitsRef, courseRef, contactRef]

  return (
    <AppLayout refs={pageRefs} menu={menu}>
      <div ref={landingRef}>
        <LandingHero />
      </div>
      <div ref={benefitsRef}>
        {/* <div>Second ref</div> */}
      </div>
      <div ref={courseRef}>
        {/* <div>Third ref</div> */}
      </div>
      <div ref={contactRef}>
        {/* <div>Last ref</div> */}
      </div>

      {/* <div style={{ minHeight: "2000px" }}></div> */}
    </AppLayout>
  )
}

export default IndexPage
