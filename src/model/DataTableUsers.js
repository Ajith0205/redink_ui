import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { Button } from 'react-bootstrap';
import '../App.css'
import { Base_Url } from '../Service/Constant';

function DataTableUsers() {
    var [eventData, setEventData] = useState([]);

    const [userDetails, setUserDetails] = useState()
    const [profile, setProfile] = useState()
    const [aadhar, setAadhar] = useState()
    const [pan, setPan] = useState()
    const role = localStorage.getItem("role")
    // console.log("role", role);
    var navigate = useNavigate();
    const token = localStorage.getItem("token");

    const config = {
        headers: { Authorization: token },
    };

    
    useEffect(() => {
        usersList()

    }, [])

    const usersList =()=>{
        axios({
            method: "get",
            headers: { Authorization: token },
            url: Base_Url + "user/getAllUsers",
            //data:inputs
        }).then((response) => {
            // console.log(response);

            // console.log("Users", response.data.users);
            setEventData(response.data.users);
            response?.data?.users?.map(element => {
                //  console.log("user", element)
                // data.rows.push(element)
            }

            );

        }, error => {
            console.log(error);
        })

    }

    const changeStatus =(index)=>{
        // console.log("index",index);
        let tempUser = { ...eventData }
        let status = !tempUser[index].status
        let userId = tempUser[index].id

        // console.log("Users List",eventData);
       
        // console.log("user status",status);
        // console.log("id",userId);
    


        axios.get(Base_Url+"user/statusChange?id="+userId +"&status="+status,config).then((res)=>{
            // console.log("res",res);
            if(res?.data?.status){
                usersList()
            }
        })
    }

    const profileGet = (profile) => {
        setProfile(profile)
    }

    const aadharGet = (aadhar) => {
        setAadhar(aadhar)
    }

    const panGet = (pan) => {
        setPan(pan)
    }

    const data = {
        columns: [

            // {
            // label:'S.No',

            // sort:'asc',
            // },
            {
                label: 'Profile',
                field: 'profile',
                sort: 'asc',
                // width: 150
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                // width: 270
            },
            {
                label: 'Father Name',
                field: 'fatherName',
                sort: 'asc',
                // width: 200
            },
            {
                label: 'Gender',
                field: 'gender',
                sort: 'asc',

            },
            {
                label: 'Email-Id',
                field: 'email',
                sort: 'asc',

            },
            {
                label: 'Date Of Birth',
                field: 'dateofbirth',
                sort: 'asc',

            },

            {
                label: 'Place Of Birth',
                field: 'placeofBirth',
                sort: 'asc',
                // width: 150
            },
            {
                label: 'Physical Status',
                field: 'physicalStatus',
                sort: 'asc',
                // width: 270
            },
            {
                label: 'Address',
                field: 'address',
                sort: 'asc',
                // width: 200
            },
            {
                label: 'AadharNo',
                field: 'aadharNo',
                sort: 'asc',

            },
            {
                label: 'Aadhar',
                field: 'uploadAadhar',
                sort: 'asc',

            },
            {
                label: 'PAN No',
                field: 'panNo',
                sort: 'asc',

            },
            {
                label: 'PAN Details',
                field: 'uploadPAN',
                sort: 'asc',

            },
            {
                label: 'Whats App No',
                field: 'whatsappNo',
                sort: 'asc',

            },
            {
                label: 'Role',
                field: 'selectRole',
                sort: 'asc',

            },
            {
                label: 'Game',
                field: 'selectgame',
                sort: 'asc',

            },
            {
                label: 'Username',
                field: 'username',
                sort: 'asc',

            }
            ,
            {
                label: 'Action',
                field: 'action'
            }
        ],
        rows: [
        ]
    };
    if (eventData != null) {
        if (role == "ADMIN") {
            eventData?.map((event,index) => {
                // console.log("event?.status",event?.status);
                if (event?.role?.role != "ADMIN") {
                    data?.rows?.push({
                        physicalStatus: event.physicalStatus,
                        whatsappNo: event.whatsappNo,
                        profile: <img src={event?.profile} alt="BigCo Inc. logo" style={{ width: "100px", height: "100px" }} data-bs-toggle="modal"
                            data-bs-target="#imagepreview" onClick={() => profileGet(event?.profile)} />,
                        name: event.name,
                        fatherName: event.fatherName,
                        gender: event.gender,
                        email: event.email,
                        dateofbirth: event.dateofbirth,
                        placeofBirth: event.placeofBirth,
                        address: event.address,
                        aadharNo: event.aadharNo,
                        uploadAadhar: <img src={event?.uploadAadhar} alt="BigCo Inc. logo" style={{ width: "100px", height: "100px" }} data-bs-toggle="modal"
                            data-bs-target="#imagepreview1" onClick={() => aadharGet(event?.uploadAadhar)} />,
                        panNo: event.panNo,
                        uploadPAN: <img src={event?.uploadPAN} alt="BigCo Inc. logo" style={{ width: "100px", height: "100px" }} data-bs-toggle="modal"
                            data-bs-target="#imagepreview2" onClick={() => panGet(event?.uploadPAN)} />,
                        whatsappNo: event.whatsappNo,
                        selectRole: event.selectRole,
                        selectgame: event.selectgame,
                        username: event.username,
                        action:<div className="form-check form-switch">
                        <input className="form-check-input mt-2 btn btn-md border-primary"
                          type="checkbox"
                          checked={event?.status}

                          onChange={() => changeStatus(index)}
                          role="switch"
                        />
                       
                      </div>

                    })


                }

            })

        } else if (role == "Trainer") {

            eventData?.map(event => {
                if (event?.role?.role != "ADMIN" && event?.role?.role != "Trainer") {
                    //   setUserDetails(event)
                    data?.rows?.push({
                        physicalStatus: event.physicalStatus,
                        whatsappNo: event.whatsappNo,
                        profile: <img src={event?.profile} alt="BigCo Inc. logo" style={{ width: "100px", height: "100px" }} data-bs-toggle="modal"
                            data-bs-target="#imagepreview" onClick={() => profileGet(event?.profile)} />,
                        name: event.name,
                        fatherName: event.fatherName,
                        gender: event.gender,
                        email: event.email,
                        dateofbirth: event.dateofbirth,
                        placeofBirth: event.placeofBirth,
                        address: event.address,
                        aadharNo: event.aadharNo,
                        uploadAadhar: <img src={event?.uploadAadhar} alt="BigCo Inc. logo" style={{ width: "100px", height: "100px" }} data-bs-toggle="modal"
                            data-bs-target="#imagepreview1" onClick={() => aadharGet(event?.uploadAadhar)} />,
                        panNo: event.panNo,
                        uploadPAN: <img src={event?.uploadPAN} alt="BigCo Inc. logo" style={{ width: "100px", height: "100px" }} data-bs-toggle="modal"
                            data-bs-target="#imagepreview2" onClick={() => panGet(event?.uploadPAN)} />,
                        whatsappNo: event.whatsappNo,
                        selectRole: event.selectRole,
                        selectgame: event.selectgame,
                        username: event.username,


                    })


                }

            })

        }

    } else {
        <div><h3>No data Found!</h3></div>
    }
    return (
        <div className='dataTable'>
            <div className='col-lg-12 overflow-auto'>
                <MDBDataTable
                    striped
                    bordered
                    small
                    data={data}
                    noBottomColumns={true}
                />


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
                            <img src={profile} alt="/redInk.png" className="img-fluid " />
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


                            <img src={aadhar} alt="/redInk.png" className="img-fluid " />

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

                            <img src={pan} alt="/redInk.png" className="img-fluid " />

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataTableUsers