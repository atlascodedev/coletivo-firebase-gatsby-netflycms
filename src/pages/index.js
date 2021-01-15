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
    console.log(props.location.state)

    let nullStateLocationError = new Error(
      "Gatsby location state is null or undefined"
    )

    try {
      if (props.location.state == null || props.location.state == undefined) {
        throw nullStateLocationError
      }

      if (props.location.state.restore !== null) {
        document
          .querySelector(`#${props.location.state.value}`)
          .scrollIntoView()
      } else {
        return
      }
    } catch (error) {
      if (error) {
        return
      }
    }
  }, [])

  return (
    <AppLayout menu={menu}>
      <div id="home" ref={landingRef}>
        <LandingHero ctaRef={contactRef} />
      </div>
      <div id="sobre-nos" ref={aboutUsRef}>
        <AboutUs />
      </div>
      <div id="novidades" ref={postsRef}>
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
