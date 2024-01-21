import React from "react";
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav id="nav">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Link to="/" id="logo">MeCrafter</Link>
                    </div>
                    <div className="col justify-content-end">
                        <ul id="nav-links" className="list-group list-group-horizontal">
                            <li className="list-group-item"><Link to="/explore">Habits</Link></li>
                            <li className="list-group-item"><Link to="/feed">Explore</Link></li>
                            <li className="list-group-item"><Link to="/">Create new habit</Link></li>
                            <li className="list-group-item"><Link to="/profile">Profile</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;