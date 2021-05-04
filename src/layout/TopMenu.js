import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { TopMenuStyle } from './style';

const TopMenu = () => {
  useLayoutEffect(() => {
    const active = document.querySelector('.strikingDash-top-menu a.active');
    const activeDefault = () => {
      const megaMenu = active.closest('.megaMenu-wrapper');
      const hasSubMenuLeft = active.closest('.has-subMenu-left');
      if (!megaMenu) {
        active.closest('ul').previousSibling.classList.add('active');
        if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
      } else {
        active.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
      }
    };
    window.addEventListener('load', active && activeDefault);
    return () => window.removeEventListener('load', activeDefault);
  }, []);

  return (
    <TopMenuStyle>
      <div className="strikingDash-top-menu">
        <ul>
          <li>
            <Link to="/" className="parent">
              Cryptocurrencies
            </Link>
          </li>

          <li>
            <Link to="#" className="parent">
              Exchanges
            </Link>
          </li>
        </ul>
      </div>
    </TopMenuStyle>
  );
};

export default TopMenu;
