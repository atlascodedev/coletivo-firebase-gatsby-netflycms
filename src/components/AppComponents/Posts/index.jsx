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
import { Fade } from "@material-ui/core"

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
          <Fade in={true} timeout={{ enter: 500 }}>
            <div>{children}</div>
          </Fade>
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

    [theme.breakpoints.up("sm")]: {
      fontSize: "0.85rem",
    },
  },
}))

function VerticalTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab className={classes.singleTab} label="Projetos" {...a11yProps(0)} />
        <Tab className={classes.singleTab} label="Notícias" {...a11yProps(1)} />
        <Tab className={classes.singleTab} label="Artigos" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <PostSlider />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PostSlider />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PostSlider />
      </TabPanel>
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
  return (
    <div>
      <PostContainer>
        <VerticalTabs />
      </PostContainer>
    </div>
  )
}

export default Posts
