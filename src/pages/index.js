import React from "react"
import AppLayout from "../layouts/AppLayout"
import _ from "lodash"
import LandingHero from "../components/AppComponents/LandingHero"
import AboutUs from "../components/AppComponents/AboutUs"
import Posts from "../components/AppComponents/Posts"
import OurTeam from "../components/AppComponents/OurTeam"
import Partners from "../components/AppComponents/Partners"
import CourseContactForm from "../components/AppComponents/ContactFormMain"

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
      menuName: "Sobre nós",
      reference: courseRef,
    },

    {
      menuName: "Novidades",
      reference: null,
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
        <AboutUs />
      </div>
      <div ref={courseRef}>
        <Posts />
      </div>

      <div>
        <OurTeam />
      </div>

      <div>
        <Partners />
      </div>

      <div ref={contactRef}>
        <CourseContactForm />
      </div>
    </AppLayout>
  )
}

export default IndexPage
