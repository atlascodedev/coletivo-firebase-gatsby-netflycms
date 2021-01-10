import React from "react"
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

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade])

function PostSlider() {
  React.useEffect(() => {
    let container = global.window.document.querySelector(".swiper-container")
      .offsetHeight

    let wrapper = global.window.document.querySelector(".swiper-wrapper")
      .offsetHeight

    console.log(`Wrapper: ${wrapper}  ---- Container: ${container}`)
  }, [])

  return (
    <div>
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
        <SwiperSlide>
          <PostCard />
        </SwiperSlide>
        <SwiperSlide>
          <PostCard />
        </SwiperSlide>
        <SwiperSlide>
          <PostCard />
        </SwiperSlide>
        <SwiperSlide>
          <PostCard />
        </SwiperSlide>
        <SwiperSlide>
          <PostCard />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default PostSlider
