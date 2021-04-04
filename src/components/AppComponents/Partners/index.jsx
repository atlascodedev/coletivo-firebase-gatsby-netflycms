import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "./partner-slider.css"

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade])

const PartnersRootContainer = styled.div`
  padding: 2em;
  padding-top: 3em;
  padding-bottom: 3em;
  background-color: #28aead;
`

const PartnerCardContainer = styled.div`
  width: 232px;
  height: 148px;

  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  background-image: ${props =>
    props.img
      ? `url(${props.img})`
      : "url(https://via.placeholder.com/232x148)"};

  background-size: 75%;
  background-repeat: no-repeat;
  background-position: center center;
`

const PartnerSectionTitle = styled.div`
  margin-bottom: 2em;
  /* margin-top: 1em; */
  font-size: 30px;
  font-family: "Barlow";
  width: 100%;
  font-weight: 700;
  text-align: center;
  color: #fff;
`

function Partners(props) {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { contentType: { eq: "partners" } } }
      ) {
        edges {
          node {
            frontmatter {
              contentType
              partnerLogo
              partnerName
            }
          }
        }
      }
    }
  `)

  const [partners, setPartners] = React.useState([])

  React.useEffect(() => {
    if (data.allMarkdownRemark.edges.length <= 0) {
      console.log("No partners found")
      return
    }
    try {
      let partnersLocal = data.allMarkdownRemark.edges.map((partner, index) => {
        return partner.node.frontmatter
      })

      setPartners(partnersLocal)
    } catch (error) {
      console.log(error)
    }
  }, [])

  console.log(partners)

  return (
    <PartnersRootContainer>
      <PartnerSectionTitle>Nossos parceiros</PartnerSectionTitle>

      <Swiper
        id="swiper-partner"
        slidesPerView={partners && partners.length < 4 ? partners.length : 4}
        noSwiping
        noSwipingClass={"no-swipe"}
        speed={3000}
        autoplay={{}}
        breakpoints={{
          1024: {
            slidesPerView:
              partners && partners.length < 4 ? partners.length : 4,
            speed: 3000,
          },
        }}
      >
        {partners.map((value, index) => {
          return (
            <SwiperSlide key={index} className={"no-swipe"}>
              <PartnerCardContainer img={value.partnerLogo} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </PartnersRootContainer>
  )
}

export default Partners
