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

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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
        <Tab label="Projetos" {...a11yProps(0)} />
        <Tab label="Notícias" {...a11yProps(1)} />
        <Tab label="Artigos" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <PostSlider />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Notícias
      </TabPanel>
      <TabPanel value={value} index={2}>
        Artigos
      </TabPanel>
    </div>
  )
}

const PostContainer = styled.div`
  padding: 4em;
`

const Posts = props => {
  return (
    <div>
      <PostContainer>
        <VerticalTabs />
      </PostContainer>

      <Box p={5}>
        <PostSlider></PostSlider>
      </Box>
    </div>
  )
}

export default Posts
