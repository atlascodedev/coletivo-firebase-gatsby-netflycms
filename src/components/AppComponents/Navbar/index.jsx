import React from "react"
import {
  Box,
  Button,
  Hidden,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Paper,
  SwipeableDrawer,
} from "@material-ui/core"
import styled from "styled-components"
import { useLocation } from "@reach/router"
import { navigate } from "gatsby"
import { Menu } from "@material-ui/icons"
import scrollIntoViewHelper from "../../../helper/scrollIntoView"

const AtlasAppBarBase = styled.div`
  display: flex;
  width: 100%;
  background-color: ${props => (props.top ? "transparent" : "#fff")};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  min-height: ${props => (props.minHeight ? props.minHeight : "60px")};
  position: fixed;
  z-index: 1199;
  justify-content: center;
  height: ${props =>
    props.top ? "90px" : props.minHeight ? props.minHeight : "60px"};
  transition: all 0.5s ease;

  /* Additional styles to prevent Firefox 2D rendering and transition bugs that will lead to flickering on said transition */
  will-change: background-color transform;
  filter: grayscale(0%);

  @media (min-width: 768px) {
    box-shadow: ${props =>
      props.top ? "none" : "0px 4px 4px rgba(0, 0, 0, 0.25)"};
  }
`

const AtlasAppBarHeightFix = styled.div`
  min-height: ${props => (props.minHeight ? props.minHeight : "60px")};
  height: ${props =>
    props.top ? "90px" : props.minHeight ? props.minHeight : "60px"};
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  display: ${props => (props.top ? "hidden" : "block")};
`

const AtlasAppBarItemContainer = styled.div`
  display: flex;
  width: 100%;
  transition: all 0.5 ease;
`
const AtlasAppBarItemList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  margin: 0;
  width: 100%;
  color: #222;
  padding: 0;
  transition: all 0.5s ease-in-out;
  padding-right: ${props => (props.top ? "10em" : "0px")};

  & > li {
    padding: 0;
    padding-left: 5em;
    margin: 0;
    margin-right: 3em;
    cursor: pointer;
    font-weight: 600;
  }
`

const AtlasAppBarLogo = styled.img`
  width: 145px;
  height: 100%;
  flex-grow: 0;
  margin-left: ${props => (props.top ? "2px" : "2px")};
  transition: all 0.5s ease;
  @media (min-width: 768px) {
    margin-left: ${props => (props.top ? "2em" : "20px")};
    width: ${props => (props.top ? "350px" : "100px")};
    height: ${props => (props.top ? "150px" : "100%")};
  }
`

const ListItemUnderEffect = styled.div`
  background-color: #17396b;
  width: 50%;
  height: 4px;
  border-radius: 10px;
  transition: all 0.3s ease;
`

const useStyles = makeStyles(theme => ({
  root: {},
  topMenuPaper: {
    // backgroundColor: theme.palette.primary.main,
    paddingBottom: "8px",
    width: "60vw",
  },

  appDrawerList: {
    display: "flex",
    fontSize: "0.5rem",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
  },
}))

function Navbar({ minHeight, height, logo, menu }) {
  const classes = useStyles()
  const [isTop, setIsTop] = React.useState(true)
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const { pathname } = useLocation()
  const isHome = pathname == "/"

  const appBarMinHeight = minHeight ? minHeight : 0
  const appBarHeight = height ? height : 0

  React.useEffect(() => {
    if (menu) {
      for (let index = 0; index < menu.length; index++) {
        menu[index].scrollFunction = () =>
          menu[index].reference.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
      }
    }
  }, [])

  React.useEffect(() => {
    if (isHome) {
      global.window.addEventListener("scroll", () => {
        if (global.window.scrollY > 1) {
          setIsTop(false)
        } else {
          setIsTop(true)
        }
      })
    } else {
      setIsTop(false)
    }
  }, [])

  return (
    <div>
      <AtlasAppBarBase
        height={appBarHeight}
        minHeight={appBarMinHeight}
        top={isTop}
      >
        <AtlasAppBarItemContainer top={isTop}>
          <AtlasAppBarLogo
            top={isTop}
            src={logo ? logo : "https://via.placeholder.com/100"}
          />
          <Hidden mdUp>
            <Box
              pr={3}
              display={"flex"}
              alignItems="center"
              justifyContent="end"
              width={"100%"}
              onClick={() => setDrawerOpen(true)}
            >
              <IconButton edge="start">
                <Menu />
              </IconButton>
            </Box>
          </Hidden>
          <Hidden only={["xs", "sm"]}>
            <AtlasAppBarItemList top={isTop}>
              {menu ? (
                menu.map((menuItem, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        scrollIntoViewHelper(menuItem.reference)
                      }}
                      onMouseEnter={() => {
                        global.window.document.querySelector(
                          `#effect${index}`
                        ).style.width = "100%"
                      }}
                      onMouseLeave={() => {
                        global.window.document.querySelector(
                          `#effect${index}`
                        ).style.width = "50%"
                      }}
                    >
                      <div>{menuItem.menuName}</div>
                      <ListItemUnderEffect top={isTop} id={"effect" + index} />
                    </li>
                  )
                })
              ) : (
                <li>No menu items found</li>
              )}
            </AtlasAppBarItemList>
          </Hidden>
        </AtlasAppBarItemContainer>
      </AtlasAppBarBase>
      <AtlasAppBarHeightFix
        height={appBarHeight}
        minHeight={appBarMinHeight}
        top={isTop}
      />
      <AppDrawer
        menu={menu}
        isHome={isHome}
        open={drawerOpen}
        handleClose={() => setDrawerOpen(false)}
        handleOpen={() => setDrawerOpen(true)}
        logo={logo ? logo : null}
      />
    </div>
  )
}

const AppDrawer = ({ open, handleClose, handleOpen, isHome, menu, logo }) => {
  const classes = useStyles()

  let iOS

  React.useEffect(() => {
    iOS = /iPad|iPhone|iPod/.test(global.window.navigator.platform)
  }, [])

  return (
    <div>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor={"left"}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        <Paper square className={classes.topMenuPaper} elevation={5}>
          <Box pl={4} pr={5}>
            <Button
              onClick={() => {
                if (!isHome) {
                  navigate("/")
                } else {
                  global.window.scrollTo(0, 0)
                }
              }}
            >
              <img
                width="100"
                src={logo ? logo : "https://via.placeholder.com/100"}
                alt="Logotipo"
              />
            </Button>
          </Box>
        </Paper>
        <List className={classes.appDrawerList}>
          {menu ? (
            menu.map((item, index) => (
              <Button
                onClick={() => {
                  scrollIntoViewHelper(item.reference)
                }}
                key={index}
              >
                <ListItem>{item.menuName} </ListItem>
              </Button>
            ))
          ) : (
            <h1>no list items find</h1>
          )}
        </List>
      </SwipeableDrawer>
    </div>
  )
}

export default Navbar
