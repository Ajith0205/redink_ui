import React, { useEffect, useState } from 'react'
import { Menu, MenuItem, ProSidebarProvider, Sidebar } from 'react-pro-sidebar'
import { FiArrowLeftCircle, FiArrowRightCircle, FiHome, FiLogOut } from 'react-icons/fi'
import { FaList, FaRegHeart } from "react-icons/fa";
import { RiPencilLine, RiVideoLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base_Url } from '../Service/Constant';
import { IoMdContact } from 'react-icons/io';

import "./Header.css";
import { width } from '@mui/system';



export default function Header() {
  var [eventData, setEventData] = useState([]);
  var [user, setUser] = useState();
  var navigate = useNavigate();
  const token = localStorage.getItem("token");

  const role = localStorage.setItem("role", user?.role?.role)
  const id = localStorage.getItem("id");

  const [isOpen, setIsOpen] = useState(false);
  const toggleLightbox = () => {
    setIsOpen(!isOpen);
  };




  
  // const location = useLocation()
  // const id= location?.state?.id;

  // console.log("userid",id);
  useEffect(() => {
    axios({
      method: "get",
      headers: { Authorization: token },
      url: Base_Url + "user/userDetails?id=" + id,
      //data:inputs
    }).then((response) => {
      // console.log("user", response);

      // console.log("userDetails", response.data.user.role.role)

      setUser(response.data.user);



    }, error => {
      console.log(error);
    })
  }, [])



  const userDetailsget = () => {
    navigate('/profile', { state: { id: user?.id } })

  }

  useEffect(() => {
    eventUploadList()
  }, [])

  const eventUploadList = () => {
    axios({
      method: "get",
      headers: { Authorization: token },
      url: Base_Url + "event/uploadList",
      //data:inputs
    }).then((response) => {
      // console.log(response);
      setEventData(response.data.dto.eventList)
    }, error => {
      console.log(error);
    })
  }


  const edit = (e) => {

    // console.log(e.id);
    navigate('/eventupdate', { state: { id: e.id } });
    // navigate('/eventupload',{id:e.id})
  }

  const deletevalue = (e) => {

    // console.log("delete id",e.id);
    const id = e.id;
    axios({
      method: "DELETE",
      headers: { Authorization: token },
      url: Base_Url + "event/eventdelete?id=" + id,
      //data:inputs
    }).then((response) => {
      console.log(response);
      if (response?.data?.status) {
        eventUploadList()
        window.location.reload(false)

      }


    })


  }


  //var navigate=useNavigate();
  const [menuCollapse, setMenuCollapse] = useState(false)

  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (

    <>
      <React.Fragment>

        <header className="header" id="mainheader">
          <div className="logotext">
            {/* small and big change using menucollapse state */}
            <div className='d-flex'>
              <p >{menuCollapse ? "REDINK" : "Sports"}</p>
              <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
                {menuCollapse ? (
                  <FiArrowRightCircle />
                ) : (
                  <FiArrowLeftCircle />
                )}
              </div>
            </div>



          </div>
          <p style={{ textAlign: "center", color: "orangered", textShadow: "inherit", marginBottom: '0px' }}>Red INk Sports </p>


          <div className='header_img'  >
            {
              user?.profile != null ? <img src={user?.profile}
                // className="rounded-circle"
                data-bs-toggle="modal"
                data-bs-target="#imagepreview" /> : <img src="/redInk.png" alt="/redInk.png" style={{ height: "50px", width: "100px" }} className="rounded-circle" data-bs-toggle="modal"
                  data-bs-target="#imagepreview" />
            }

          </div>


        </header>
       
        <div id='header'>
          <ProSidebarProvider collapsed={menuCollapse}>

            <Sidebar style={{ marginTop: "65px" }}>
              <Menu iconShape="square">
                <MenuItem active={true} icon={<FiHome />}> Home</MenuItem>
                {
                  user?.role?.role == "ADMIN" || user?.role?.role == "Trainer" ?
                    <MenuItem icon={<FaList />} >

                      <Link to='/datatable' >Users</Link>
                    </MenuItem>

                    : ""
                }


                <MenuItem icon={<FaRegHeart />}>
                  <Link to='/eventupload'> Events</Link>
                </MenuItem>

                <MenuItem icon={<RiVideoLine />}>
                  <Link to='/videoupload'  >Videos</Link>
                </MenuItem>
                {
                  user?.role?.role == "ADMIN" || user?.role?.role == "Trainer" ?
                    <MenuItem icon={<IoMdContact />}>   <Link to='/register' >Create User</Link> </MenuItem>
                    : ""
                }
                <MenuItem icon={<FiLogOut />}  >
                  <Link to='/' >Logout</Link>
                </MenuItem>
              </Menu>
            </Sidebar>

          </ProSidebarProvider>

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

                {
                  user?.profile != null ? <img src={user?.profile} alt="/redInk.png" className="img-fluid " />
                    : <img src="/redInk.png" className="img-fluid " />
                }


              </div>

            </div>
          </div>
        </div>

      </React.Fragment>
      <div className='text-end' style={{ marginTop: "80px", marginLeft: '210px', marginRight: '10px' , }} >
          <button className='btn btn-warning' onClick={userDetailsget}>MyDetails && Edit</button>
          <Link to='/changePassword' className='btn btn-primary'> changePassword</Link>

        </div>
      <div className='card' style={{ backgroundColor: "#e1d0ba", marginLeft: '210px', marginRight: '10px' }}>

        <h1 style={{ marginBottom: "20px" ,textAlign:"center" }}>Events</h1>
        <div className='row' >
          {

            eventData != null ? eventData?.map((event, index) => {
              return (
                <div key={index} className="col-lg-12">
                  <div className='card' style={{ marginTop: "20px" }}>
                    <div style={{ alignItems: "center" }}>
                      <img src={event?.image} alt="BigCo Inc. logo" style={{ width: "1000px", height: "600px" }} />
                    </div>

                    <div className='row'>
                      <div className='col-3'>
                        <label>Event Name:{event?.eventName}</label>


                      </div >
                      <div className='col-3'>
                        <label>Date:{event?.eventDate}</label>
                      </div>
                      <div className='col-3'>
                        <label>Place:{event?.eventPlace}</label>
                      </div>
                      <div className='col-3' style={{ alignItems: "flex-end" }}>

                        <button className="btn btn-warning"
                          onClick={() => edit(event)}
                        >

                          Edit</button>


                        <button style={{ marginLeft: "5px" }} onClick={() => deletevalue(event)} className="btn btn-danger"> <i className='bi bi-database-fill-check'></i>Delete</button>

                      </div>

                    </div>
                  </div>
                </div>

              );
            }) : <div><h3  style={{textAlign:"center"}}>No Event Found</h3></div>


          }

        </div>

      </div>

    </>


  )
}









