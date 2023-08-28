import React, { useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Profile.css";


function Profile() {
    var navigate = useNavigate();
    var [finduser, setUserDetails] = useState([]);
    var token = localStorage.getItem("token");

    const location = useLocation()
    const id = location.state.id;
    // console.log("userid", id);
    useEffect(() => {
        axios({
            method: "get",
            headers: { Authorization: token },
            url: "http://192.168.1.143:8008/user/userDetails?id=" + id,
            //data:inputs
        }).then((response) => {
            console.log("user", response);

            // console.log("userDetails", response.data.user)
            var usersDet = response.data.user;
            //  console.log("userD", usersDet)
            setUserDetails(usersDet);



        }, error => {
            console.log(error);
        })
    }, [])

    const update = () => {
        // const user=finduser
        var user = {
            "id": finduser?.id,
            "name": finduser?.name,
            "gender": finduser?.gender,
            "email": finduser?.email,
            "address": finduser?.address,
            "selectRole": finduser?.selectRole,
            "selectgame": finduser?.selectgame,
            "username": finduser?.username,
            "password": finduser?.password,
            "fatherName": finduser?.fatherName,
            "dateofbirth": finduser?.dateofbirth,
            "placeofBirth": finduser?.placeofBirth,
            "physicalStatus": finduser?.physicalStatus,
            "aadharNo": finduser?.aadharNo,
            "panNo": finduser?.panNo,
            "whatsappNo": finduser?.whatsappNo,
            "profile": finduser?.profile,
            "uploadAadhar": finduser?.uploadAadhar,
            "uploadPAN": finduser?.uploadPAN

        }
        axios({
            method: "PUT",
            headers: { Authorization: token },
            url: "http://192.168.1.143:8008/user/update",
            data: user,
        }).then((response) => {
            console.log("response", response);

            if (response?.status === 200) {
                navigate('/headersnav');

            }





        })
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        //  console.log("inputs",finduser,e.target.value);
        //form controller name=name assined
        let name = e.target.name;
        if (name != "profile" && name != "uploadAadhar" && name != "uploadPAN") {
            let value = e.target.value;
            // console.log("name",value);
            setUserDetails(preValue => ({ ...preValue, [name]: value }))
        } else {
            let files = e.target.files;
            let fileReader = new FileReader();
            fileReader.readAsDataURL(files[0]);

            fileReader.onload = (event) => {
                let value = event.target.result;
                console.log("value", value)
                setUserDetails(preValue => ({ ...preValue, [name]: value }))
            }

        }
    }



    // console.log("asdas", finduser)
    return (

        <div className='container rounded bg-white mt-5 mb-5'>
            <div className='card'>
                <div className='row'>
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <div className='row'>
                                <div className=''>
                                    <img src={finduser?.profile} className="rounded-circle mt-5" width="200px" height="200px" data-bs-toggle="modal"
                                        data-bs-target="#imagepreview" ></img>
                                </div>
                                <div className='col-2' style={{ marginLeft: "100px" }}>
                                    <input type='file' name='profile' onChange={(e) => { handleOnChange(e) }} />
                                </div>
                                {/* <span class="font-weight-bold">{finduser?.username}</span>
                                <span class="font-weight-bold">{finduser?.email}</span> */}
                            </div>

                            <div className='row' style={{ marginTop: "10px" }}>
                                <div className='row'>
                                    <div className="">
                                        <label>Aadhar Photo</label>
                                        <img src={finduser?.uploadAadhar} className="" data-bs-toggle="modal"
                                        data-bs-target="#imagepreview1" width="100px" height="100px"></img>

                                        <input type='file' name='uploadAadhar' onChange={(e) => { handleOnChange(e) }} style={{ marginLeft: "160px" }} />

                                    </div>
                                </div>

                                <div className='row' style={{ marginTop: "10px" }}>
                                    <div className="">
                                        <label>PAN Photo</label>
                                        <img src={finduser?.uploadPAN} className="" width="100px" height="100px" data-bs-toggle="modal"
                                        data-bs-target="#imagepreview2"></img>
                                        <input type='file' name='uploadPAN' onChange={(e) => { handleOnChange(e) }} style={{ marginLeft: "160px" }} />

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label>Name</label>
                                    <input type="text" name='name' value={finduser?.name} onChange={(e) => { handleOnChange(e) }} ></input>
                                </div>
                                <div className="col-md-6">
                                    <label>Father Name</label>
                                    <input type="text" name='fatherName' value={finduser?.fatherName} onChange={(e) => { handleOnChange(e) }} ></input>
                                </div>
                                <div className="col-md-6">
                                    <label>Gender</label>
                                    <input type="text" name='gender' value={finduser?.gender} onChange={(e) => { handleOnChange(e) }} ></input>

                                </div>
                                <div className="col-md-6">
                                    <label>Email</label>
                                    <input type="text" name='email' value={finduser?.email} onChange={(e) => { handleOnChange(e) }}></input>
                                </div>
                                <div className="col-md-6">
                                    <label>Date Of Birth</label>
                                    <input type="date" name='dateofbirth' value={finduser?.dateofbirth} onChange={(e) => { handleOnChange(e) }}></input>
                                </div>

                                <div className="col-md-6">
                                    <label>Place Of Birth</label>
                                    <input type="text" name='placeofBirth' value={finduser?.placeofBirth} onChange={(e) => { handleOnChange(e) }}></input>
                                </div>

                                <div className="col-md-6">
                                    <label>physical Status</label>
                                    {/* <input value={finduser.physicalStatus}  /> */}
                                    <select name='physicalStatus' value={finduser?.physicalStatus} onChange={(e) => { handleOnChange(e) }}>
                                        <option >---select one---</option>
                                        <option value='normal' >normal</option>
                                        <option value='ubnormal' >ubnormal</option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label>Address</label>
                                    <input type="text" name='address' value={finduser?.address} onChange={(e) => { handleOnChange(e) }}></input>
                                </div>
                                <div className="col-md-6">
                                    <label>Aadhar Number</label>
                                    <input type="text" name='aadharNo' value={finduser?.aadharNo} onChange={(e) => { handleOnChange(e) }}></input>
                                </div>

                                <div className="col-md-6">
                                    <label>PAN Number</label>
                                    <input type="text" value={finduser?.panNo} onChange={(e) => { handleOnChange(e) }}></input>
                                </div>


                                <div className="col-md-6" style={{ marginTop: "10px" }}>
                                    <label>Role</label>
                                    <select name="selectRole" value={finduser?.selectRole} onChange={(e) => { handleOnChange(e) }}>
                                        <option  >---select Role---</option>
                                        <option value='Trainer' >Trainer</option>
                                        <option value='Player' >Player</option>
                                    </select>
                                </div>

                                <div className="col-md-6" style={{ marginTop: "10px" }}>
                                    <label>Game</label>
                                    <select name="selectgame" value={finduser?.selectgame} onChange={(e) => { handleOnChange(e) }} >
                                        <option >---select Game---</option>
                                        <option value='Kabaddi' >Kabaddi</option>
                                        <option value='volleyBall' >volleyBall</option>
                                        <option value='footBall'>footBall</option>
                                        <option value='cricket'>cricket</option>
                                    </select>
                                </div>
                                {/* <div className="col-md-6">
                <label>Aadhar Photo</label>
                <input type='file' name='uploadAadhar' onChange={(e)=>{handleOnChange(e)}}/>
                <input type="text" name='uploadAadhar'  value={finduser?.uploadAadhar}  onChange={(e)=>{handleOnChange(e)}}></input>
                </div>

                <div className="col-md-6">
                <label>PAN Photo</label>
                <input type='file' name='uploadPAN' onChange={(e)=>{handleOnChange(e)}}/>
                <input type="hide" name='uploadPAN' value={finduser?.uploadPAN} onChange={(e)=>{handleOnChange(e)}}></input>
                </div> */}

                                <div className="col-md-6">
                                    <label>Whats App Number</label>
                                    <input type="text" name='whatsappNo' value={finduser?.whatsappNo} onChange={(e) => { handleOnChange(e) }} ></input>
                                </div>

                                <div className="col-md-6">
                                    <label>UserName</label>
                                    <input type="text" name='username' value={finduser?.username} onChange={(e) => { handleOnChange(e) }}></input>
                                </div>

                            </div>


                        </div>
                    </div>
                    <div className='textAlign:center' style={{ marginBottom: "30px" }}>
                        <button className='btn btn-warning' onClick={update}>Update</button>
                    </div>

                </div>
            </div>
            <div className="modal fade" id="imagepreview" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" >
                <div className="modal-dialog  modal-dialog-centered modal-dialog-zoom preview_dialog">
                    <div className=" modal-content">
                        <div className='modal-header d-flex justify-content-end'>
                            <button id='closedeleteallmodal' className="btn btn_cancel " data-bs-dismiss="modal" >
                                X
                            </button>
                        </div>
                        <div className="modal-body text-center">

                            {/* <div> */}
                            {/* <img  src="https://images.unsplash.com/photo-1689631857988-a46ee3adf86b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80"
                alt="preview" className="popupview_image  "/> */}
                            <img src={finduser?.profile} alt="/redInk.png" className="img-fluid " />
                            {/* </div> */}
                        </div>

                    </div>
                </div>
            </div>


            <div className="modal fade" id="imagepreview1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" >
                <div className="modal-dialog  modal-dialog-centered modal-dialog-zoom preview_dialog">
                    <div className=" modal-content">
                        <div className='modal-header d-flex justify-content-end'>
                            <button id='closedeleteallmodal' className="btn btn_cancel " data-bs-dismiss="modal" >
                                X
                            </button>
                        </div>
                        <div className="modal-body text-center">

                            {/* <div> */}
                            {/* <img  src="https://images.unsplash.com/photo-1689631857988-a46ee3adf86b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80"
                alt="preview" className="popupview_image  "/> */}
                            <img src={finduser?.uploadAadhar} alt="/redInk.png" className="img-fluid " />
                            {/* </div> */}
                        </div>

                    </div>
                </div>
            </div>


            <div className="modal fade" id="imagepreview2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" >
                <div className="modal-dialog  modal-dialog-centered modal-dialog-zoom preview_dialog">
                    <div className=" modal-content">
                        <div className='modal-header d-flex justify-content-end'>
                            <button id='closedeleteallmodal' className="btn btn_cancel " data-bs-dismiss="modal" >
                                X
                            </button>
                        </div>
                        <div className="modal-body text-center">

                            {/* <div> */}
                            {/* <img  src="https://images.unsplash.com/photo-1689631857988-a46ee3adf86b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80"
                alt="preview" className="popupview_image  "/> */}
                            <img src={finduser?.uploadPAN} alt="/redInk.png" className="img-fluid " />
                            {/* </div> */}
                        </div>

                    </div>
                </div>
            </div>


        </div>


    )
}

export default Profile