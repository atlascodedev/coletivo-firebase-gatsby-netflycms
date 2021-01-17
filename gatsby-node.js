const _ = require("lodash")
const path = require("path")
const {
  createFilePath,
  createRemoteFileNode,
} = require("gatsby-source-filesystem")

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

    type Frontmatter @infer {
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

exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  store,
  cache,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions

  // if (
  //   node.internal.type === "MarkdownRemark" &&
  //   node.frontmatter.featuredimage !== null
  // ) {
  //   let fileNode = await createRemoteFileNode({
  //     url: node.frontmatter.featuredimage,
  //     parentNodeId: node.id,
  //     createNode,
  //     createNodeId,
  //     cache,
  //     store,
  //   })

  //   if (fileNode) {
  //     node.featuredimage__NODE = fileNode.id
  //   }
  // }

  if (
    node.internal.type === "MarkdownRemark" &&
    node.frontmatter.templateKey == "post" &&
    node.frontmatter.featuredimage !== null
  ) {
    let optimizedImage =
      node.frontmatter.featuredimage.split(".").splice(0, 1).join(".") +
      "-thumbnail.webp"

    createNodeField({
      name: "processedImage",
      value: optimizedImage,
      node,
    })
  }

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
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const posts = result.data.allMarkdownRemark.edges

      posts.forEach(edge => {
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
          const slug = edge.node.fields.slug

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
              slug,
            },
          })
        }
      })
    })
    .catch(error => {
      console.log("damn there was an error", error)
    })
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {}
