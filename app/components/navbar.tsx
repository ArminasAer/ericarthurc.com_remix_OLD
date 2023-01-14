import { NavLink } from '@remix-run/react';

export default function Navbar() {
  return (
    <nav className="navbar" id="navbar">
      <NavLink className="navbar-link" to="/">
        BLOG
      </NavLink>
      <NavLink className="navbar-link" to="/series">
        SERIES
      </NavLink>
      <NavLink className="navbar-link" to="/about">
        ABOUT
      </NavLink>
    </nav>
  );
}
