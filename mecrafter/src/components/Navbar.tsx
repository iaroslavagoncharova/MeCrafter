import { Link } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');
    return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Link to="/" id="logo">MeCrafter</Link>
                    </div>
                    <div className="col justify-content-end">
                        <ul id="nav-links" className="list-group list-group-horizontal">
                             <li className="list-group-item"><Link to="/feed">Feed</Link></li>
                             <li className="list-group-item"><Link to="/explore">Explore</Link></li>
                            <li className="list-group-item"><Link to="/">Create new habit</Link></li>
                            { token ? <li className="list-group-item"><Link to="/profile">Profile</Link></li> : null }
                            { !token ? <li className="list-group-item"><Link to="/signup">Sign up</Link></li> : null }
                        </ul>
                    </div>
                </div>
            </div>
    )
}

export default Navbar;