import { graphql, useStaticQuery } from "gatsby"
import React from "react"

function ArticlePost(props) {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { contentType: { eq: "teamMembers" } } }
      ) {
        edges {
          node {
            frontmatter {
              teamMemberName
              teamMemberPicture
              teamMemberPosition
              active
            }
          }
        }
      }
    }
  `)
  console.log(data)

  return <div>Article Post template</div>
}

export default ArticlePost
