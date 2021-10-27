import React from "react"
import PropTypes from "prop-types"

import { section } from "./section.module.css"

const Section = ({ children, className }) => (
  <div className={`${section} ${className}`}>{children}</div>
)

export default Section

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Section.defaultProps = {
  className: "",
}
