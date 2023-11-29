import React, { useEffect, useState } from 'react';
import "./styles/Register.scss";
import { Formik, Field, Form } from "formik";
import { GiSpectacleLenses } from 'react-icons/gi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: ""
    }
    const [formData, SetFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: ""
    })
    const ErrorData = {
        firstname: "First name required",
        lastname: "Last name required",
        email: "Email required",
        phone: "Phone number required",
        password: "Password required"
    }
    const [formError, SetFormError] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: ""
    })
    const formValid = () => {
        let Errors = {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            password: ""
        }
        let valid;
        Object.entries(formData).filter((val) => {
            let [key, value] = val;
            if (!value.trim()) {
                valid = false;
                for(let [k,v] of Object.entries(ErrorData)){
                    if(key === k){
                        console.log(k,v)
                        SetFormError({...formError,[k]:v});
                        //Errors[k] = v;
                        //console.log(formError);
                    }
                }
                //console.log(key, val);
            }
        })
        
        console.log("Empty:", formError);
        //console.log(Object.keys(formData));
        // for (let [key, value] of Object.entries(formData)) {
        //     console.log(key, value);
        //     if(!value.trim()){
        //         console.log("form invalid");
        //         SetFormError({...formError, [key]:value})
        //         valid = false;
        //     }else{
        //         console.log("form valid");
        //     }

        // }

        return valid;
    }
    useEffect(()=>{
        formValid();
    },[]);

    const handleInputChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        SetFormData({ ...formData, [name]: value })

        //SetFormData(e.target.value)

    }
    const SubmitRegister = async () => {
        //console.log("formData:", formData);
        //event.preventDefault();
        if(formValid()){
            
        }
        try {
            const response = await fetch('http://localhost:8000/users', {
                method: "POST",
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // toast.success("Registration Successful!", {
                //     position: toast.POSITION.TOP_CENTER
                // });
                navigate('/login');
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
                    <div className="login_control p-5">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={SubmitRegister}>
                            <Form>
                                <div className="control">
                                    <div className="label">First name</div>
                                    <Field name="firstname" type="text" className="form-control" value={formData.firstname} onChange={handleInputChange} placeholder='First name' />
                                    <span className='text-red'>{formError.firstname}</span>
                                </div>
                                <div className="control">
                                    <div className="label">Last name</div>
                                    <Field name="lastname" type="text" className="form-control" value={formData.lastname} onChange={handleInputChange} placeholder='Last name' />
                                    <span className='text-red'>{formError.lastname}</span>
                                </div>
                                <div className="control">
                                    <div className="label">Email</div>
                                    <Field name="email" type="text" className="form-control" value={formData.email} onChange={handleInputChange} placeholder='Email' />
                                    <span className='text-red'>{formError.email}</span>
                                </div>
                                <div className="control">
                                    <div className="label">Phone</div>
                                    <Field name="phone" type="text" className="form-control" value={formData.phone} onChange={handleInputChange} placeholder='Phone Number' />
                                    <span className='text-red'>{formError.phone}</span>
                                </div>
                                <div className="control mt-4">
                                    <div className="label">Password</div>
                                    <Field name="password" type="password" className="form-control" value={formData.password} onChange={handleInputChange} placeholder='password' />
                                    <span className='text-red'>{formError.password}</span>
                                </div>
                                {/* <div className="control mt-4">
                                    <div className="label">Confirm Password</div>
                                    <Field name="confirmpassword" type="password" className="form-control" value={formData.password} onChange={handleInputChange} placeholder='password' />
                                </div> */}
                                <div>
                                    <button type='submit' className="btn btn-primary mt-4">Register</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;