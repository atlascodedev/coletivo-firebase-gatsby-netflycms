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

  background-size: cover;
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
    // let partnersLocal = []

    let partnersLocal = data.allMarkdownRemark.edges.map((partner, index) => {
      return partner.node.frontmatter
    })

    setPartners(partnersLocal)
  }, [])

  console.log(partners)

  return (
    <PartnersRootContainer>
      <PartnerSectionTitle>Nossos parceiros</PartnerSectionTitle>

      <Swiper
        id="swiper-partner"
        slidesPerView={1}
        noSwiping
        noSwipingClass={"no-swipe"}
        autoplay={{
          delay: 0,
          waitForTransition: false,
          disableOnInteraction: false,
        }}
        speed={3000}
        loop={true}
        breakpoints={{
          1024: {
            autoplay: {
              delay: 0,
              disableOnInteraction: false,
            },
            slidesPerView: 4,
            speed: 3000,
            loop: true,
          },
        }}
      >
        <SwiperSlide className={"no-swipe"}>
          <PartnerCardContainer />
        </SwiperSlide>
        <SwiperSlide className={"no-swipe"}>
          <PartnerCardContainer />
        </SwiperSlide>
        <SwiperSlide className={"no-swipe"}>
          <PartnerCardContainer />
        </SwiperSlide>
        <SwiperSlide className={"no-swipe"}>
          <PartnerCardContainer />
        </SwiperSlide>
        <SwiperSlide className={"no-swipe"}>
          <PartnerCardContainer />
        </SwiperSlide>{" "}
        <SwiperSlide className={"no-swipe"}>
          <PartnerCardContainer />
        </SwiperSlide>
        <SwiperSlide className={"no-swipe"}>
          <PartnerCardContainer />
        </SwiperSlide>
        <SwiperSlide className={"no-swipe"}>
          <PartnerCardContainer />
        </SwiperSlide>
        <SwiperSlide className={"no-swipe"}>
          <PartnerCardContainer />
        </SwiperSlide>
        <SwiperSlide className={"no-swipe"}>
          <PartnerCardContainer />
        </SwiperSlide>
      </Swiper>
    </PartnersRootContainer>
  )
}

export default Partners
