import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import styled from "styled-components"

import PostCard from "./PostCard"
import PostSlider from "./PostSlider"
import { Container, Fade, Slide } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      style={{ overflow: "hidden", width: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Slide
            in={true}
            direction={"right"}
            timeout={{ enter: 1000, exit: 500 }}
          >
            <div>
              <Fade in={true} timeout={{ enter: 1750 }}>
                <div>{children}</div>
              </Fade>
            </div>
          </Slide>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  }
}

const useStyles = makeStyles(theme => ({
  ancientRoot: {
    marginBottom: "1em",
    marginTop: "1em",

    "& .postSectionTitleContainer": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: 800,
      fontFamily: theme.typography.fontFamily,
      textTransform: "uppercase",
      textAlign: "center",
      fontSize: "0.75rem",

      "@media (min-width: 1024px)": {
        fontSize: "1.15rem",
        marginBottom: "2rem",
      },
    },
  },

  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
    boxShadow: "1px 4px 4px rgba(0, 0, 0, 0.25)",
    alignItems: "center",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    overflow: "visible",
  },

  singleTab: {
    fontSize: "0.6rem",
    fontWeight: 800,
    fontFamily: theme.typography.fontFamily,

    [theme.breakpoints.up("sm")]: {
      fontSize: "0.85rem",
    },
  },
}))

function VerticalTabs({ posts }) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [articlesPosts, setArticlesPosts] = React.useState([])
  const [newsPosts, setNewsPosts] = React.useState([])
  const [eventsPosts, setEventsPosts] = React.useState([])

  React.useEffect(() => {
    posts.forEach(post => {
      if (post.post.contentType == "events") {
        setEventsPosts(prevEvents => [...prevEvents, post])
      } else if (post.post.contentType == "news") {
        setNewsPosts(prevNews => [...prevNews, post])
      } else {
        setArticlesPosts(prevArticles => [...prevArticles, post])
      }
    })
  }, [])

  console.log(articlesPosts, "articles")
  console.log(newsPosts, "news")
  console.log(eventsPosts, "events")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // articles, news, events

  return (
    <div className={classes.ancientRoot}>
      <div className={"postSectionTitleContainer"}>
        <h2>Fique por dentro das nossas novidades</h2>
      </div>

      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab
            className={classes.singleTab}
            label="Projetos"
            {...a11yProps(0)}
          />
          <Tab
            className={classes.singleTab}
            label="Notícias"
            {...a11yProps(1)}
          />
          <Tab
            className={classes.singleTab}
            label="Artigos"
            {...a11yProps(2)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <PostSlider postData={eventsPosts} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PostSlider postData={newsPosts} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PostSlider postData={articlesPosts} />
        </TabPanel>
      </div>
    </div>
  )
}

const PostContainer = styled.div`
  padding: 0.5em;

  @media (min-width: 1024px) {
    padding: 4em;
  }
`

const Posts = props => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "post" } } }
      ) {
        edges {
          node {
            frontmatter {
              templateKey
              contentType
              title
              description
              featuredimage
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const [postData, setPostData] = React.useState([])

  React.useEffect(() => {
    data.allMarkdownRemark.edges.forEach(post => {
      setPostData(prevPosts => [
        ...prevPosts,
        { post: post.node.frontmatter, slug: post.node.fields.slug },
      ])
    })
  }, [])

  console.log(postData)

  return (
    <div>
      {postData.length > 0 ? (
        <PostContainer>
          <VerticalTabs posts={postData} />
        </PostContainer>
      ) : null}
    </div>
  )
}

export default Posts
