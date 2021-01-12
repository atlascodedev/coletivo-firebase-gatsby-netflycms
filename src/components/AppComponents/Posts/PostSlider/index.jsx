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
import PostCard from "../PostCard"
import "./slider.css"

const NoPostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 800;
  width: 100%;
  margin-left: 20px;

  @media (min-width: 1024px) {
    margin-left: 0px;
  }
`

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade])

function PostSlider({ postData }) {
  const [postSlide, setPostSlides] = React.useState([])

  // React.useEffect(() => {
  //   let container = global.window.document.querySelector(".swiper-container")
  //     .offsetHeight

  //   let wrapper = global.window.document.querySelector(".swiper-wrapper")
  //     .offsetHeight

  //   console.log(`Wrapper: ${wrapper}  ---- Container: ${container}`)
  // }, [])

  React.useEffect(() => {
    setPostSlides(postData)
  }, [postData])

  console.log(postSlide, "post slide")

  return (
    <div>
      {postSlide.length > 0 ? (
        <Swiper
          id="swiper-1"
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={true}
          watchOverflow={true}
          spaceBetween={50}
          breakpoints={{
            1024: {
              slidesPerView: "auto",
              pagination: { clickable: true },
              spaceBetween: 0,
            },
          }}
        >
          {postSlide.map((post, index) => (
            <SwiperSlide key={index}>
              <PostCard
                link={post.slug}
                excerpt={post.post.description}
                image={post.post.featuredimage}
                title={post.post.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <NoPostContainer>
          <p>Nenhum post foi encontrado</p>
        </NoPostContainer>
      )}
    </div>
  )
}

export default PostSlider
