import React from 'react';

import { section } from './section.module.css';

const Section: React.FC<{ className: string | null }> = ({ children, className }) => (
  <section className={`${section} ${className}`}>{children}</section>
);

export default Section;
