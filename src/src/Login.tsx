import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from "formik";
import "./styles/Login.scss";
import { GiSpectacleLenses } from "react-icons/gi";
import { Link, Navigate, redirect} from "react-router-dom";
const Login = () => {
    const initialValues = {
        username: "",
        password: ""
    }
    const [auth,setAuth] = useState(false);
    const handleLogin = () => {
        setAuth(true);
    }
    if(auth){
        return <Navigate to="/Dashboard" />
    }
    return (
        <>
            <div className='d-flex h-100 justify-content-center align-items-center'>
                <div className="login_box">
                    <div className="p-4 d-flex justify-content-center align-items-center">
                        <div className="outter">
                            <GiSpectacleLenses className='logo' />
                        </div>

                    </div>
                    <div className="login_control p-5">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleLogin}>
                            <Form>
                                <div className="control">
                                    <div className="label">Email Address</div>
                                    <Field name="username" type="text" className="form-control" value="admin@gmail.com" placeholder='Email' />
                                </div>

                                <div className="control mt-4">
                                    <div className="label">Password</div>
                                    <Field name="username" type="password" className="form-control" value="123456" placeholder='password' />
                                </div>
                                <div>
                                    <button className="btn btn-primary mt-4">LOGIN</button>

                                    <Link to={"/signup"} className="link-primary">Sign Up</Link>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Login;