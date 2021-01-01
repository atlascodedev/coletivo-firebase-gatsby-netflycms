import { graphql } from "gatsby"
import React from "react"

function ArticlePost(props) {
  console.log(props)

  return <div>Article Post template</div>
}

export default ArticlePost

export const articlePostQuery = graphql`
  query ArticlePost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
