import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@material-ui/lab"
import React from "react"
import styled from "styled-components"

interface Props {
  timelineText: any
}

const TimelineItemContainer = styled.div`
  font-size: 16px;

  @media (min-width: 1024px) {
    font-size: 22px;
  }
`

const TimelineCustomItem = ({ timelineText }: Props) => {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot style={{ color: "#28AEAD", backgroundColor: "#28AEAD" }} />
        <TimelineConnector
          style={{ color: "#28AEAD", backgroundColor: "#28AEAD" }}
        />
      </TimelineSeparator>

      <TimelineContent>
        <TimelineItemContainer>{timelineText}</TimelineItemContainer>
      </TimelineContent>
    </TimelineItem>
  )
}

export default TimelineCustomItem
