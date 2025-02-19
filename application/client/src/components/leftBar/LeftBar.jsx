import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { BiUser, BiBook } from 'react-icons/bi';
import { RiServiceLine } from 'react-icons/ri';
import { BiMessageMinus } from 'react-icons/bi';
import { TiGroup } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";

import './leftBar.css';

const LeftBar = () => {
  const [activeNav, setActiveNav] = useState('/');

  const handleNavClick = (nav) => {
    setActiveNav(nav);
  };

  const navItems = [
    { to: '/', icon: <HiHome size={25}/> },
    { to: '/about-us', icon: <TiGroup size={25}/>  },
    { to: '/settings', icon: <IoSettingsOutline size={25}/>
  },
  ];

  return (
    <div className="leftBar">
      <div className="left-container">
        <div className="menu">
          {navItems.map((item, index) => (
            <Link to={item.to} key={index}>
              <div
                className={`item ${activeNav === item.to ? 'active' : ''}`}
                onClick={() => handleNavClick(item.to)}
              >
                {item.icon}
                <h4>{item.label}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
