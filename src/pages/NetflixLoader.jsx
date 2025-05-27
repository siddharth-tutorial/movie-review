import React from 'react';
import './netflix.css';

function NetflixLoader() {
  return (
    <div className="netflix-loader-wrapper">
      <div className="netflix-loader">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
}

export default NetflixLoader;
