import React from 'react';
import './Toolbar.css';

function Toolbar() {
  return (
    <div className="Toolbar">
      <div className="page-links">
        <a href="/about-me">About Me</a>
        <a href="/example-1">Example 1</a>
      </div>
      <div className="social-links">
        <a href="https://github.com/">GitHub</a>
        <a href="https://linkedin.com/">LinkedIn</a>
        <a href="https://twitter.com/">Twitter</a>
      </div>
    </div>
  );
}

export default Toolbar;
