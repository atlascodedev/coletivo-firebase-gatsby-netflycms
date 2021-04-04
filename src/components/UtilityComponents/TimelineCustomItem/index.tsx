import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@material-ui/lab"
import React from "react"

interface Props {
  timelineText: any
}

const TimelineCustomItem = ({ timelineText }: Props) => {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot style={{ color: "#28AEAD", backgroundColor: "#28AEAD" }} />
        <TimelineConnector
          style={{ color: "#28AEAD", backgroundColor: "#28AEAD" }}
        />
      </TimelineSeparator>

      <TimelineContent>{timelineText}</TimelineContent>
    </TimelineItem>
  )
}

export default TimelineCustomItem
