import React from "react"
import { graphql } from "gatsby"

function NewsPost(props) {
  console.log(props.data)

  return <div>news post yo</div>
}

export default NewsPost

export const newsPostQuery = graphql`
  query NewsPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
