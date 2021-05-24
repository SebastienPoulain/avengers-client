import React from "react";
import "./Footer.css";

const Footer = ({ footer }) => {
  return (
    <footer>
      <div className="footer">
        {footer ? (
          <a target="_blank" href="http://marvel.com">
            {footer}
          </a>
        ) : (
          <p>Projet réalisé par Sébastien Poulain - 2021</p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
