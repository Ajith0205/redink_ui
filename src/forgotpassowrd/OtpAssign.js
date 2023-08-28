import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Base_Url } from '../Service/Constant';
import "../App.css"
function OtpAssign() {
    const [inputs, setInputs] = useState({});
    var navigate = useNavigate();
    const handleOnChnage = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        // console.log("name",value);
        setInputs(preValue => ({ ...preValue, [name]: value }))
    }

    const otpverify = (e) => {
        // alert("called");
        // console.log("forgotpassword",inputs);
        axios({
            method: "post",
            url: Base_Url + "user/checkOtp",
            data: inputs,
        }).then((response) => {
            //   console.log("res",response.data);
            //   console.log(response.data.status);
            if (response.data.status) {
                navigate('/');

            }


        }, error => {
            console.log(error);
        })

    }
    return (
        <div className='OtpAssain'>
            <div className='col-lg-6 offset-lg-3'>
               
                    <div className='row' >
                    <div className='card' style={{ marginTop: "200px" }}>
                        <div className='row' style={{ marginTop: "10px" }}>
                            <div className='col-6'>
                                <label>OTP</label>
                            </div>
                            <div className='col-4'>
                                <input type="otp" name="otp" value={inputs.otp || ""} onChange={(e) => { handleOnChnage(e) }} />
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

                        <div className='row' style={{ marginTop: "10px" }}>
                            <div className='col-6'>
                                <labe>Create New Password</labe>
                            </div>
                            <div className='col-4'>
                                <input type="text" name="newPassword" value={inputs.newPassword || ""} onChange={(e) => { handleOnChnage(e) }} />
                            </div>
                        </div>

                        <div className='row' style={{ marginTop: "10px" }}>
                            <div className='col-6'>
                                <labe>Coform Password</labe>
                            </div>
                            <div className='col-4'>
                                <input type="text" name="confirmPassword" value={inputs.confirmPassword || ""} onChange={(e) => { handleOnChnage(e) }} />
                            </div>
                        </div>

                        <div className='row' style={{ marginTop: "10px" ,marginBottom:"20px"}}>
                            <div className='col-4'>
                                <button className='btn btn-warning'><Link to={'/otpsend'}>Back</Link></button>

                            </div>
                            <div className='col-6'>
                                <button className='btn btn-primary' onClick={otpverify}>submit</button>
                            </div>
                        </div>
                        </div>
                    </div>
               
            </div>

        </div>
    )
}

export default OtpAssign