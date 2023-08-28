import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment';
import { Base_Url } from '../Service/Constant';
import "../App.css"
function User() {
  var navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const token = localStorage.getItem("token");
  const role=localStorage.getItem("role");
console.log("role",role);
  const handleOnChnage = (e) => {
    e.preventDefault();
    // console.log("inputs",inputs,e.target.value);
    //form controller name=name assined
    let name = e.target.name;
    if (name != "profile" && name != "uploadAadhar" && name != "uploadPAN") {
      let value = e.target.value;
      // console.log("name",value);
      setInputs(preValue => ({ ...preValue, [name]: value }))
    } else {
      let files = e.target.files;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);

      fileReader.onload = (event) => {
        let value = event.target.result;
        // console.log("value", value)
        setInputs(preValue => ({ ...preValue, [name]: value }))
      }

    }



  }
  //  console.log("inputs",inputs);

  function saveSubmit() {
    axios({
      method: "post",
      headers: { Authorization: token },
      url: Base_Url + "user/saveuser",
    
      data: inputs
    }).then((response) => {
      // console.log(response);
      if (response.data.status) {
        navigate('/')
      }
      // console.log("Register",response.data.information.message) ;



    }, error => {
      console.log(error);
    })
  }

  return (
    <div className='register' >
      <React.Fragment>
        <div className='row' >
          <div className='col-lg-8 offset-lg-2'>
            <div className='card' style={{ backgroundColor: "#F67D49",marginTop: "20px" }} ><h1>Create Account</h1> </div>

            <div className='row' >
              <div className='card'>

                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "5px" }}>
                    <label >Profile Photo</label>
                  </div>
                  <div className='col-4'>
                    <input type="file" name="profile" onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>

                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>Name</label></div>
                  <div className='col-4'>
                    <input type="text" name="name" value={inputs.name} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>

                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>FatherName</label></div>
                  <div className='col-4'>
                    <input type="text" name="fatherName" value={inputs.fatherName} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>

                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>Gender</label></div>
                  <div className='col-4'>
                    <label><input type="radio" name="gender" value='male' onChange={(e) => { handleOnChnage(e) }} />Male</label>

                    <label><input type="radio" name="gender" value='female' onChange={(e) => { handleOnChnage(e) }} />Female</label>
                  </div>
                </div>
                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>Email</label></div>
                  <div className='col-4'>
                    <input type="text" name="email" value={inputs.email} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>
                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>Date Of Birth</label></div>
                  <div className='col-4'>
                    <input type="Date" name="dateofbirth" value={inputs.dateofbirth} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>
                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>Place Of Birth</label></div>
                  <div className='col-4'>
                    <input type="text" name="placeofBirth" value={inputs.placeofBirth} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>
                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>Physical Status</label></div>
                  <div className='col-4'>
                    <select name='physicalStatus' value={inputs.physicalStatus} onChange={(e) => { handleOnChnage(e) }} >
                      <option >---select one---</option>
                      <option value='normal' >normal</option>
                      <option value='ubnormal' >ubnormal</option>
                    </select>
                  </div>
                </div>
                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>Address</label></div>
                  <div className='col-4'>
                    <input type="text" name="address" value={inputs.address} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>
                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>Aadhar Number</label></div>
                  <div className='col-4'>
                    <input type="Number" name="aadharNo" value={inputs.aadharNo} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>
                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>Upload Aadhar</label></div>
                  <div className='col-4'>
                    <input type="file" name="uploadAadhar" onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>
                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>PAN Number</label></div>
                  <div className='col-4'>
                    <input type="text" name="panNo" value={inputs.panNo} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>
                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>Upload PAN</label></div>
                  <div className='col-4'>
                    <input type="file" name="uploadPAN" onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>
                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>WhatsApp Number</label></div>
                  <div className='col-4'>
                    <input type="Number" name="whatsappNo" value={inputs.whatsappNo} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>
                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>Select Role</label></div>
                  <div className='col-4'>
                    {
                      role == "ADMIN" ?  <select value={inputs.selectRole} name="selectRole" onChange={(e) => { handleOnChnage(e) }}>
                      <option   >---select Role---</option>
                      <option value='Trainer' >Trainer</option>
                      <option value='Player' >Player</option>
                    </select>:  <select value={inputs.selectRole} name="selectRole" onChange={(e) => { handleOnChnage(e) }}>
                      <option    >---select Role---</option>
                      <option value='Player' >Player</option>
                    </select>
                    }
                   
                  </div>
                </div>
                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}><label>Select Game</label></div>
                  <div className='col-4'>
                    <select value={inputs.selectgame} name="selectgame" onChange={(e) => { handleOnChnage(e) }}>
                      <option >---select Game---</option>
                      <option value='Kabaddi' >Kabaddi</option>
                      <option value='volleyBall' >volleyBall</option>
                      <option value='footBall'>footBall</option>
                      <option value='cricket'>cricket</option>
                    </select>
                  </div>
                </div>

                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}>
                    <label className='form-controller' >UserName</label>
                  </div>
                  <div className='col-4'>
                    <input type="text" name="username" value={inputs.username || ""} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>

                {/* <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' style={{ marginLeft: "10px" }}>
                    <label className='form-controller'>Password</label>
                  </div>
                  <div className='col-4'>
                    <input type="password" name="password" value={inputs.password || ""} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div> */}

                <div className='row' style={{ marginTop: "10px" }}>

                  <div className='col-6'>
                    {/* <Link to={'/'}>Do You already a Account?</Link> */}
                  </div>
                  <div className='col-6' style={{ marginBottom: "10px" }}>
                    <button className='btn btn-success' onClick={saveSubmit}  >Save</button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </React.Fragment>

    </div>
  )
}

export default User