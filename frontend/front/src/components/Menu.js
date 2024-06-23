import React from "react";
import './menu_style.css'
import {faHome, faHomeLg, faHomeLgAlt, faMusic, faSearch, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

class Menu extends React.Component {
    render() {
        return (
            <div className="container-menu">
                <h1>SpotStats</h1>
              <div className="sidebar">
                  <Link to={"/"}>
                <div className="sidebar-option">
                    <FontAwesomeIcon icon={faHomeLgAlt} />
                    <span>Home</span>
                </div>
                      </Link>
                  <Link to={"/search"}>
                <div className="sidebar-option">
                  <FontAwesomeIcon icon={faSearch} />
                  <span>Ricerca</span>
                </div>
                      </Link>
                <Link to={"/trending_artists"}>
                  <div className="sidebar-option">
                  <FontAwesomeIcon icon={faStar} />
                  <span>Trending Artists</span>
                </div>
                    </Link>
              </div>
            </div>
  );
    }
}

export default Menu;