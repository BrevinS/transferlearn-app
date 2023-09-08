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
        <a href="https://github.com/BrevinS">
          <i className="fab fa-github"></i> GitHub
        </a>
        <a href="https://linkedin.com/in/brevin-simon-a197ba206/">
          <i className="fab fa-linkedin"></i> LinkedIn
        </a>
        <a href="https://twitter.com/BrevinOfficial">
          <i className="fab fa-twitter"></i> Twitter
        </a>
      </div>
    </div>
  );
}

export default Toolbar;
