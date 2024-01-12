import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Dashboard from "./dashboard";
import About from "./About";
import Contact from "./contact";
import Login from "./Login";
import Register from "./Register";
import { AuthProvider } from "./AuthProvider";
import { AuthRequire } from "./AuthRequire";
import Products from "./common/ProductList";

const AppRoutes: React.FC = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <div className="container-fluid p-0" style={{height:"100vh"}}>
                    <Routes>
                        {/* <Route path="/" element={<Home />} /> */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<AuthRequire element={<Dashboard />} />} />
                        <Route path="/dashboard" element={<AuthRequire element={<Dashboard />} />} />
                        <Route path="/products" element={<AuthRequire element={<Products />} />} />
                        <Route path="/register" element={<Register />} />

                        {/* <Route path="/dashboard" element={<AuthRequire element={<Dashboard />}/>} /> */}
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </AuthProvider>
        </>
    )
}

export default AppRoutes;