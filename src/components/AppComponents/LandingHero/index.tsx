import React from "react"
import styled from "styled-components"
import { Button, Typography, Box, Container } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import GatsbyImage, { GatsbyImageProps } from "gatsby-image"
import LandingBG from "../../../images/svg-hero-front.svg"

const LandingBackgroundHero = styled.div<{ image: string }>`
  position: relative;
  z-index: 1;
  background-image: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  height: auto;
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

const LandingHeroImage = styled(GatsbyImage)<GatsbyImageProps>`
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    margin-top: 2em;
    width: 100%;
    height: 100%;
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

  const [cta, setCta] = React.useState(null)

  React.useEffect(() => {
    if (ctaRef) {
      setCta(ctaRef.current)
    }
  }, [])

  return (
    <Box sx={{ pb: { xs: "50px" } }}>
      <Container maxWidth="lg">
        <LandingBackgroundHero image={LandingBG}>
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
                    <Box
                      fontSize={{ xs: "30px", lg: "38px" }}
                      fontWeight={"bold"}
                      color="#17396B"
                    >
                      Instituto Gaúcho Pró-Cidadania: um agente social
                      transformador
                    </Box>
                  </div>

                  <Box
                    fontSize={{ xs: "16px", lg: "20px" }}
                    color="#5A5A5A"
                    fontWeight={500}
                    padding={{ xs: "35px 0px" }}
                  >
                    Elaboração e assessoria integral de projetos em parceria com
                    o poder público e a sociedade civil na promoção da
                    cidadania.
                  </Box>

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
      </Container>
    </Box>
  )
}

export default LandingHero
