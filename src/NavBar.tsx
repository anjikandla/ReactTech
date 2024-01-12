import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from './AuthProvider';
import { GiSpectacleLenses } from "react-icons/gi";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
const NavBar = () => {
    const userData = useAuth();
    //console.log("NavBar", userData.user);
    const logout = () => {
        userData.logout(null);
    }
    return (
        <>
            {userData.user ? (
                <>
                    <div className="bg-dark text-white d-flex justify-content-between px-2 py-1">
                        <div className=""></div>
                        <div className="d-flex align-items-center">
                            <AiOutlineUser />
                            <span className="px-2 lh-1">{userData.user.firstname} {userData.user.lastname}</span> <span className="grey96">|</span>
                            <Link to={"/login"} className="nav-link px-2 lh-1" onClick={logout}><AiOutlineLogout /></Link>
                            {/* <Link to={"/login"} className="nav-link">Login</Link> */}
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-lg p-0 m-0">
                        <div className="container-fluid p-0">
                            <a className="navbar-brand bg-primary px-3 text-white" href="#">
                                <GiSpectacleLenses className='logo' style={{ fontSize: 60 }} />
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                    <Link to="/about" className="nav-link">About</Link>
                                    <Link to="/products" className="nav-link">Products</Link>
                                    <Link to="/contact" className="nav-link">Contact</Link>
                                </div>
                            </div>
                            
                        </div>
                    </nav>
                </>
            ) : (<></>)}
        </>
    )
}

export default NavBar;