import React, { useState, useEffect } from "react"
import { AiOutlineGithub, AiOutlineMail } from "react-icons/ai"
import PropTypes from "prop-types"

import "modern-normalize"
import "@fontsource/open-sans"

import Hero from "./hero"

import { mainWrapper } from "./layout.module.css"

const Layout = ({ children, projectsRef, index }) => {
  const [projectsElRef, setProjectsElRef] = useState()

  useEffect(() => {
    if (!projectsRef) return
    setProjectsElRef(projectsRef.current)
  }, [projectsRef])

  return (
    <>
      <div>
        {index && <Hero projectsRef={projectsElRef && projectsElRef} />}
        <main className={mainWrapper}>{children}</main>
        <footer>
          <span>
            <AiOutlineGithub /> danbb1
          </span>
          <span>
            <AiOutlineMail />
            hello@danbridges.co.uk
          </span>
          <span>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </span>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  projectsRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.bool,
}

Layout.defaultProps = {
  index: false,
  projectsRef: undefined,
}

export default Layout
