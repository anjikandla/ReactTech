import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./styles/Login.scss";
import { GiSpectacleLenses } from "react-icons/gi";
import { Link, Navigate, redirect, useNavigate, } from "react-router-dom";
import * as Yup from 'yup';
import { useAuth } from './AuthProvider';
const Login = () => {
    const initialValues = {
        email: "",
        password: ""
    }
    const passwordRegExp= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    const WhiteSpacesRegExp = /^(\s*)$/
    const validateRegisterForm = Yup.object().shape({
        email:Yup.string().email("Invalid email").required('Email is required'),
        password:Yup.string().matches(passwordRegExp, "Password must be at least 8 characters, at least one uppercase letter, one number & one symbol.")
            //.matches(WhiteSpacesRegExp,"Password should not contain any spaces")
            .required("Password is required")
        
    })
    const navigate = useNavigate()
    const { login } = useAuth();
    //const [auth,setAuth] = useState(false);
    const [pwdMsg,SetPwdMsg] = useState("");
    const [emailMsg,SetEmailMsg] = useState("");
    const handleLogin = (values:any) => {
        //setAuth(true);
        //console.log(values)
        //login(values.email);
        fetch('http://localhost:3000/users/').then(
            (res)=>{
                return res.json();
            }).then((resp)=>{
                //console.log(resp);
                const FilterUser =  resp.filter((data: { email: string }) => data.email.includes(values.email))
                const userData = Object.assign({},...FilterUser);
                // console.log("FilterUser:", FilterUser);
                // console.log("userData:", userData);
                if(FilterUser.length === 0){
                    SetEmailMsg("Email Doesn't exist");
                }else{
                    SetEmailMsg("");
                    FilterUser.map((user: { firstname:string, lastname:string, email: string,password: string }) =>{
                        if(user.password === values.password){
                            const userData = Object.assign({},...FilterUser);
                            login(userData);
                            //console.log(userData);
                            SetPwdMsg("");
                            navigate('/dashboard')
                        }else{
                            SetPwdMsg("Wrong Password");
                        }
                    })
                }
                
                //login(FilterUser.email);
            }).catch(error => console.error(error))
    }
    // if(auth){
    //     return <Navigate to="/Dashboard" />
    // }
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
                            initialValues={initialValues} validationSchema={validateRegisterForm}
                            onSubmit={handleLogin}>
                            <Form>
                                <div className="control">
                                    <div className="label">Email Address</div>
                                    <Field name="email" type="text" className="form-control" placeholder='Email' />
                                    <ErrorMessage name="email" component="div" className='FormErrorMsg'/>
                                    <span className='FormErrorMsg'>{emailMsg}</span>
                                </div>

                                <div className="control mt-4">
                                    <div className="label">Password</div>
                                    <Field name="password" type="password" className="form-control" placeholder='password' />
                                    <ErrorMessage name="password" component="div" className='FormErrorMsg'/>
                                    <span className='FormErrorMsg'>{pwdMsg}</span>
                                </div>
                                <div className='text-center'>
                                    <button type='submit' className="btn btn-primary mt-4">LOGIN</button>
                                    <div className='mt-2'>Don't have an account? <Link to={"/register"} className="link-primary">Sign Up</Link></div>
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