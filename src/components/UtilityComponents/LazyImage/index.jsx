import React, { useState, useEffect } from "react"
import styled from "styled-components"

const BaseImage = styled.img`
  transition: all 1s ease-in-out;
  filter: ${props => (props.loaded ? "blur(0px)" : "blur(30px)")};
  width: 100%;
  height: 100vh;
  overflow: hidden;
  object-fit: cover;
`

const BaseImageBackground = styled.div`
  transition: all 1s ease;
  filter: ${props => (props.loaded ? "blur(0px)" : "blur(30px)")};
  background-image: ${props =>
    props.loaded ? `url(${props.src})` : `url(${props.thumbnail})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  overflow: hidden;
  position: relative;
`

function LazyImage(props) {
  const setImage = () => {
    let mainImg = new Image()
    mainImg.src = props.image

    mainImg.onload = () => {
      setActiveImage(mainImg.src)
      setLoaded(true)
    }
  }

  useEffect(() => {
    setImage()

    return () => {
      console.log("clean up")
    }
  }, [])

  const [activeImage, setActiveImage] = useState(props.thumbnail)

  const [loaded, setLoaded] = useState(false)

  const imageComponent = props.background ? (
    <BaseImageBackground
      src={activeImage}
      thumbnail={props.thumbnail}
      loaded={loaded}
      background={props.background}
    ></BaseImageBackground>
  ) : (
    <BaseImage src={activeImage} loaded={loaded} />
  )

  return imageComponent
}

export default LazyImage
