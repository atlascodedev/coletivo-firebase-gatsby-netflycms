const _ = require("lodash")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              contentType
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      console.log(edge)

      if (edge.node.frontmatter.templateKey === "ignore") {
        return
      } else {
        const id = edge.node.id
        const contentType = edge.node.frontmatter.contentType

        console.log("****************************************", contentType)

        createPage({
          path: edge.node.fields.slug,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.jsx`
          ),
          context: {
            id,
          },
        })
      }
    })
  })
}
