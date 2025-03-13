import React from 'react'
import {Link, NavLink} from 'react-router-dom'

import "./Navbar.css"

const Navbar = () => {
    return (
      <nav>
        <Link to="/" className='title'>Weather App</Link>
        <ul>
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
            <li>
                <NavLink to="/weather">Weather</NavLink>
            </li>
            <li>
                <NavLink to="/contact">Contact</NavLink>
            </li>
        </ul>
      </nav>
    );
  }
  
  export default Navbar;
  