import { NavLink } from "react-router-dom";
import logo from "../../assets/matteologo.jpg";

import "./navbar-styles.css";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <img className="nav-logo" src={logo} />
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/create">
              New Post
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              All Posts
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/backend">
              Backend
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
