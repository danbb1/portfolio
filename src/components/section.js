import React from "react"

import { section } from "./section.module.css"

const Section = ({ children, className }) => (
  <div className={`${section} ${className}`}>{children}</div>
)

export default Section
