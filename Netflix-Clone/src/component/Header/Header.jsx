import React from "react";
import Logo from '../../assets/image/Logo/netfilix.png'
import './header.css'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
const Header = () => {
  return (
    <>
      <div className="header-continer">
        <div className="header-wraper">
          <div className="header-link">
            <ul>
              <li><img src={Logo} alt="" /></li>
              <li>Netflix</li>
              <li>Home</li>
              <li>TVShows</li>
              <li>Movies</li>
              <li>Latest</li>
              <li>MyList</li>
              <li>Browse by Languages</li>
            </ul>
          </div>
          <div className="header-icon-link">
            <div><SearchIcon /></div>
            <div><NotificationsNoneIcon /></div>
            <div><AccountBoxIcon />
                {/* <div className="dropdown">
                  <p>Sign Out of Netflix</p>
                </div> */}
              </div>
            <div><KeyboardArrowDownIcon /></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
