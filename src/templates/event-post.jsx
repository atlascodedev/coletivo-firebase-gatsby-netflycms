import React from "react"
import { graphql } from "gatsby"

function EventPost(props) {
  console.log(props)

  return <div>This is the event post template</div>
}

export default EventPost

export const eventPostQuery = graphql`
  query EventPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
