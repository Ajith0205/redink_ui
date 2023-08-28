import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Base_Url } from '../Service/Constant';
import "../App.css"
function ForgotPasswordOtp() {
    const [inputs, setInputs] = useState({});
    var navigate = useNavigate();
    const handleOnChnage = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        // console.log("name",value);
        setInputs(preValue => ({ ...preValue, [name]: value }))

    }

    const otpsend = (e) => {
        // alert("called");
        // console.log("forgotpassword", inputs);
        axios({
            method: "post",
            url: Base_Url + "user/forgotpasswordOTP",
            data: inputs,
        }).then((response) => {
            // console.log("Login Response", response.data);
            // console.log(response.data.status);
            if (response.data.status) {
                navigate('/otpAssign');



            }




        }, error => {
            console.log(error);
        })
    }

    return (
        <div className='emailOtpsend'>
            <div className='col-lg-4 offset-lg-4' >

                <div className='row' >
                    <div className='card' style={{ marginTop: "300px" }} >
                        <div className='row ' style={{ marginTop: "10px" }}>
                            <div className='col-6'>
                                <label>email</label>
                            </div>
                            <div className='col-4'>
                                <input type="email" name="email" value={inputs.email || ""} onChange={(e) => { handleOnChnage(e) }} />
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: "10px" }}>
                            <div className='col-6'>
                                <labe>Username</labe>
                            </div>
                            <div className='col-4'>
                                <input type="text" name="username" value={inputs.username || ""} onChange={(e) => { handleOnChnage(e) }} />
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <div className='col-4'>
                                <button className='btn btn-warning'><Link to={'/'}>Back</Link></button>

                            </div>
                            <div className='col-6'>
                                <button className='btn btn-primary' onClick={otpsend}>submit</button>
                            </div>
                        </div>
                    </div >
                </div>

            </div>

        </div>
    )
}

export default ForgotPasswordOtp