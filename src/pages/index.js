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
  const contactRef = React.useRef(null)
  const postsRef = React.useRef(null)
  const aboutUsRef = React.useRef(null)

  const [locationState, setLocationState] = React.useState(null)

  const menu = [
    {
      menuName: "Home",
      reference: landingRef,
    },

    {
      menuName: "Sobre nós",
      reference: aboutUsRef,
    },

    {
      menuName: "Novidades",
      reference: postsRef,
    },

    {
      menuName: "Contato",
      reference: contactRef,
    },
  ]

  React.useEffect(() => {
    try {
      if (props.location.state.restore !== null) {
        global.window.scrollTo({
          behavior: "smooth",
          top: props.location.state.value,
        })
      } else {
        return
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <AppLayout menu={menu}>
      <div ref={landingRef}>
        <LandingHero ctaRef={contactRef} />
      </div>
      <div ref={aboutUsRef}>
        <AboutUs />
      </div>
      <div ref={postsRef}>
        <Posts />
      </div>

      <div>
        <OurTeam />
      </div>

      <div>
        <Partners />
      </div>

      <div id="contato" ref={contactRef}>
        <CourseContactForm />
      </div>
    </AppLayout>
  )
}

export default IndexPage
