import { makeStyles, SvgIcon } from "@material-ui/core"
import { WhatsApp } from "@material-ui/icons"
import React from "react"
import styled from "styled-components"

const WhatsAppAnchor = styled.a`
  position: fixed;
  width: 40px;
  height: 40px;
  bottom: 16px;
  left: 16px;
  background-color: #25d366;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  box-shadow: 2px 2px 3px #999;
  z-index: 1000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const useStyles = makeStyles(theme => ({
  icon: {
    width: "20px",
    height: "20px",
  },
}))

function WhatsAppButton({ href }) {
  const classes = useStyles()

  return (
    <WhatsAppAnchor href={href ? href : "#"}>
      <SvgIcon component={WhatsApp}></SvgIcon>
    </WhatsAppAnchor>
  )
}

export default WhatsAppButton
