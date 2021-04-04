import React from "react"
import AppLayout from "../layouts/AppLayout"
import _ from "lodash"
import LandingHero from "../components/AppComponents/LandingHero"
import AboutUs from "../components/AppComponents/AboutUs"
import Posts from "../components/AppComponents/Posts"
import OurTeam from "../components/AppComponents/OurTeam"
import Partners from "../components/AppComponents/Partners"
import CourseContactForm from "../components/AppComponents/ContactFormMain"
import scrollPolyfill from "../helper/scrollPolyfill"
import { graphql } from "gatsby"
import OurTeamV2 from "../components/AppComponents/OurTeam_v2"

export type MenuItem = {
  menuName: string
  reference: React.RefObject<HTMLElement> | null
}

const IndexPage: React.FC<any> = props => {
  const landingRef = React.useRef(null)
  const contactRef = React.useRef(null)
  const postsRef = React.useRef(null)
  const aboutUsRef = React.useRef(null)

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
    let nullStateLocationError = new Error(
      "Gatsby location state is null or undefined"
    )

    try {
      if (props.location.state == null || props.location.state == undefined) {
        throw nullStateLocationError
      } else if (props.location.state.restore == null) {
        throw new Error("Restore state could not be found in Gatsby location")
      } else {
        document
          .querySelector(`#${props.location.state.value}`)
          .scrollIntoView()
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
        <OurTeamV2 />
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
export const query = graphql`
  query {
    file(relativePath: { eq: "coletivo-hero-img.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
