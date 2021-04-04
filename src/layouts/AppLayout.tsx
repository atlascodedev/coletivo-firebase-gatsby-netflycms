import React from "react"
import Footer from "../components/AppComponents/Footer"
import Navbar from "../components/AppComponents/Navbar"
import logo from "../images/pro-cidadania-logo.svg"
import { Helmet } from "react-helmet"

interface AppLayoutProps {
  children: React.ReactNode
  menu: any
  pageTitle?: string
}

function AppLayout({ children, menu, pageTitle }: AppLayoutProps) {
  return (
    <React.Fragment>
      <Helmet>
        <title>
          {pageTitle
            ? `Instituto Gaúcho Pró Cidadania - ${pageTitle}`
            : "Instituto Gaúcho Pró Cidadania - Elaboração e assessoria integral de projetos"}
        </title>
      </Helmet>
      <Navbar menu={menu} logo={logo} />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  )
}

export default AppLayout
