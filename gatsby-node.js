const _ = require("lodash")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
      html: String
    }

    type Fields {
      slug: String
    }

    type Frontmatter {
      templateKey: String
      contentType: String
      title: String
      active: Boolean
      teamMemberName: String
      teamMemberPosition: String
      teamMemberPicture : String
      description: String
      featuredimage: String
      body: String
      date: Date
      address: String
      phoneOne: String
      phoneTwo: String
      mailOne: String
      mailTwo: String
      facebookUrl: String
      instagramUrl: String
      whatsAppNum: Int
      whatsAppMessage: String
      partnerName: String
      partnerLogo: String
      markdown: String


    }
  `

  createTypes(typeDefs)
}

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
            html
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              contentType
              title
              date
              description
              featuredimage
              markdown
            }
          }
        }
      }
    }
  `)
    .then(result => {
      console.log(result)

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
          const templateKey = edge.node.frontmatter.templateKey
          const contentType = edge.node.frontmatter.contentType
          const title = edge.node.frontmatter.title
          const date = edge.node.frontmatter.date
          const description = edge.node.frontmatter.description
          const featuredImage = edge.node.frontmatter.featuredimage
          const markdown = edge.node.frontmatter.markdown
          const html = edge.node.html

          console.log("****************************************", contentType)

          createPage({
            path: edge.node.fields.slug,
            component: path.resolve(
              `src/templates/${String(edge.node.frontmatter.templateKey)}.jsx`
            ),
            context: {
              id,
              templateKey,
              contentType,
              title,
              date,
              description,
              featuredImage,
              markdown,
              html,
            },
          })
        }
      })
    })
    .catch(error => {
      console.log("damn there was an error", error)
    })
}
