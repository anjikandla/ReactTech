import React, { useEffect, useState } from 'react';
import "./styles/Register.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { GiSpectacleLenses } from 'react-icons/gi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { InputAdornment } from '@mui/material';

const Register = () => {
    const navigate = useNavigate();
    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmpassword:""
    }
    const [formData, SetFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmpassword:""
    })
    const [regResponse,SetRegResponse] = useState(false);

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const passwordRegExp= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    const WhiteSpacesRegExp = /^(\s*)$/
    const validateRegisterForm = Yup.object().shape({
        firstname:Yup.string().min(2, "First Name must be atleaset 2 characters").required("First Name is required"),
        lastname:Yup.string().required("Last Name is required").min(2),
        email:Yup.string().email("Invalid email").required('Email is required'),
        phone:Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone number is required")
            .min(10, "too short").max(10, "too long"),
        password:Yup.string().matches(passwordRegExp, "Password must be at least 8 characters, at least one uppercase letter, one number & one symbol.")
            //.matches(WhiteSpacesRegExp,"Password should not contain any spaces")
            .required("Password is required"),
        confirmpassword:Yup.string().required("Password is required").oneOf([Yup.ref('password')], "Password do not match")

    })
    useEffect(()=>{
        //formValid();
    },[]);

    // const handleInputChange = (e: any) => {
    //     e.preventDefault();
    //     const { name, value } = e.target;
    //     SetFormData({ ...formData, [name]: value })

    // }
    const SubmitRegister = async (values: any,{}: any) => {
        console.log("formData:", formData);
        //event.preventDefault();
        console.log("values:", values)
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: "POST",
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                // toast.success("Registration Successful!", {
                //     position: toast.POSITION.TOP_CENTER
                // });
                SetRegResponse(true);
                console.log(regResponse);
                //navigate('/login');
                setTimeout(()=>{
                    navigate('/login');
                },3000)
            } else {
                toast.error("Registration Failed ", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } catch(error){
            toast.error("Error Occurred ", {
                data:{
                    error:error
                }
            });
        }
    }
    return (
        <>
            <ToastContainer />
            <div className='d-flex h-100 justify-content-center align-items-center'>
                <div className="login_box">
                    <div className="p-4 d-flex justify-content-center align-items-center">
                        <div className="outter">
                            <GiSpectacleLenses className='logo' />
                        </div>

                    </div>
                    <div className="login_control p-5 py-3">
                        <Formik
                            initialValues={initialValues} validationSchema={validateRegisterForm}
                            onSubmit={SubmitRegister}>
                            {({errors, touched, isValid,dirty}) => (
                                <Form>
                                    <div className="control">
                                        <div className="label">First name</div>
                                        <Field name="firstname" type="text" className="form-control" placeholder='First name'
                                        // InputProps={{
                                        //     endAdornment:
                                        //         <InputAdornment position="end">
                                        //             {errors.firstname && touched.firstname && (
                                        //                 <IoIosCheckmarkCircle
                                        //                     style={{ color: "#05cc30" }}
                                        //                     fontSize="default"
                                        //                 ></IoIosCheckmarkCircle>
                                        //             )}
                                        //         </InputAdornment>

                                        // }}
                                        />
                                        {/* <span className='text-red'>{formError.firstname}</span> */}
                                        <ErrorMessage name="firstname" component="div" className='FormErrorMsg'/>
                                    </div>
                                    <div className="control">
                                        <div className="label">Last name</div>
                                        <Field name="lastname" type="text" className="form-control" placeholder='Last name' />
                                        {/* <span className='text-red'>{formError.lastname}</span> */}
                                        <ErrorMessage name="lastname" component="div" className='FormErrorMsg'/>
                                    </div>
                                    <div className="control">
                                        <div className="label">Email</div>
                                        <Field name="email" type="text" className="form-control" placeholder='Email' />
                                        <ErrorMessage name="email" component="div" className='FormErrorMsg'/>
                                        {!errors.email && touched.email &&(<IoIosCheckmarkCircle className='ValidFormIcon' />)}
                                    </div>
                                    <div className="control">
                                        <div className="label">Phone</div>
                                        <Field name="phone" type="text" className="form-control" placeholder='Phone Number' />
                                        <ErrorMessage name="phone" component="div" className='FormErrorMsg'/>
                                        {!errors.phone && touched.phone &&(<IoIosCheckmarkCircle className='ValidFormIcon' />)}
                                    </div>
                                    <div className="control">
                                        <div className="label">Password</div>
                                        <Field name="password" type="password" className="form-control" placeholder='password' />
                                        <ErrorMessage name="password" component="div" className='FormErrorMsg'/>
                                    </div>
                                    <div className="control">
                                        <div className="label">Confirm Password</div>
                                        <Field name="confirmpassword" type="password" className="form-control" placeholder='Confirm Password' />
                                        <ErrorMessage name="confirmpassword" component="div" className='FormErrorMsg'/>
                                        {!errors.confirmpassword && touched.confirmpassword &&(<IoIosCheckmarkCircle className='ValidFormIcon' />)}
                                    </div>
                                    <div>
                                        <button type='submit' className={`btn mt-4 ${!(isValid && dirty) ? 'btn-secondary':'btn-primary' }`} disabled={!(isValid && dirty)}>Register</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    {(regResponse &&
                        <div className="success-checkmark">
                            <div className="check-icon">
                                <span className="icon-line line-tip"></span>
                                <span className="icon-line line-long"></span>
                                <div className="icon-circle"></div>
                                <div className="icon-fix"></div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default Register;