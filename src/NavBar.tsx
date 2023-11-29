import React from "react";
import { Link} from "react-router-dom";
const NavBar = () => {
    return (
        <>
            <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <Link to="/about" className="nav-link">About</Link>
                            <Link to="/contact" className="nav-link">Contact</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;