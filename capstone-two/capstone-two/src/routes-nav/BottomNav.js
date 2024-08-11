import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import "./BottomNav.css"


/** Bottom Navigation bar for site. Shows up on every page.
 * 
 *  This is used as a developer naviavation bar
 * 
 * 
*/

function BottomNav() {


return (
<nav className="Bottom-Nav navbar fixed-bottom navbar navbar-expand-md">
<ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
                <Link className="nav-link github" to= {{ pathname:"https://github.com/Centristy/capstone-two" }} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
                </Link>
            </li>
            <li className="nav-item mr-4">
            <Link className="nav-link linked-in" to= {{ pathname:"https://www.linkedin.com/in/vickytanglee/" }} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
                </Link>
            </li>

            <li className="nav-item mr-4">
                <p className="nav-link" >© 2024 Violet</p>
            </li>



        </ul>
</nav>

    );
}

export default BottomNav;
