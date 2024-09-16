// src/Components/Footer.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer 
      className="footer bg-dark text-white text-center py-0" 
      style={{ position: 'fixed', bottom: 0, width: '100%' }}
    >
      &copy; 2024 Thetavega Tech Pvt. Ltd.
    </footer>
  );
}

export default Footer;
