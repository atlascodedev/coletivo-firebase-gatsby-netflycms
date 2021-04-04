import React from "react"
import styled from "styled-components"
import landingBg from "../../../images/svg-hero-front.svg"
// import heroImg from "../../../images/coletivo-hero-img.png"
import { Button } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import GatsbyImage from "gatsby-image"

const LandingBackgroundHero = styled.div`
  position: relative;
  z-index: 1;
  background-image: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  height: calc(100vh - 90px);
  width: 100%;

  @media (min-width: 1024px) {
    height: calc(100vh - 90px);
    display: flex;
  }
`

const LandingHeroGridContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  font-family: "Barlow";
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: none;
  }
`

const LandingHeroImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    order: 1;
  }
`

const LandingHeroImage = styled(GatsbyImage)`
  width: 85%;
  height: 85%;

  @media (min-width: 768px) {
    margin-top: 2em;
    width: 85%;
    height: 85%;
  }

  @media (min-width: 1024px) {
    /* height: 100%; */
    /* width: 100%; */
  }
`

const LandingHeroTextContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 1024px) {
    justify-content: flex-start;
    align-items: center;
    margin-left: 2em;
    margin-top: 0em;
  }
`

const LandingHeroTextInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (min-width: 1024px) {
    justify-content: center;
    width: 100%;
  }
`

const HeroTextMainText = styled.div`
  font-weight: 700;
  color: #414143;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    & > h1 {
      margin: 0;

      color: #22a7aa;
    }
  }

  & .secondaryText {
    > p {
      font-weight: 600;
    }
  }

  & .ctaButton {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
  }

  @media (min-width: 768px) {
    & > div {
      font-size: 20px;
    }
  }

  @media (min-width: 1024px) {
    & > div {
      font-size: 26px;
      line-height: 1.2;
    }
  }
`

function LandingHero({ ctaRef, ...props }) {
  const heroImgWebp = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "coletivo-hero-img.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  console.log(heroImgWebp)

  const [cta, setCta] = React.useState(null)

  React.useEffect(() => {
    if (ctaRef) {
      setCta(ctaRef.current)
    }
  }, [])

  return (
    <div>
      <LandingBackgroundHero image={landingBg}>
        <LandingHeroGridContainer>
          <LandingHeroImageContainer>
            <LandingHeroImage
              imgStyle={{ objectFit: "contain" }}
              fluid={heroImgWebp.file.childImageSharp.fluid}
            />
          </LandingHeroImageContainer>

          <LandingHeroTextContainer>
            <LandingHeroTextInnerContainer>
              <HeroTextMainText>
                <div>
                  <h1>Elaboração e assessoria integral em projetos</h1>
                </div>

                <div className={"secondaryText"}>
                  <p>
                    O Instituto Gaúcho Pró-Cidadania trabalha em parceria com o
                    poder público e a sociedade civil em ações e projetos na
                    promoção da cidadania.
                  </p>
                </div>

                <div className={"ctaButton"}>
                  <Button
                    onClick={() => cta.scrollIntoView({ behavior: "smooth" })}
                    variant="contained"
                    color="secondary"
                  >
                    Fale conosco
                  </Button>
                </div>
              </HeroTextMainText>
            </LandingHeroTextInnerContainer>
          </LandingHeroTextContainer>
        </LandingHeroGridContainer>
      </LandingBackgroundHero>
    </div>
  )
}

export default LandingHero
