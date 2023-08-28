import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../App.css"
function ChangePassword() {

  const [inputs, setInputs] = useState({});
  var navigate = useNavigate();
  const handleOnChnage = (e) => {
    let name = e.target.name
    let value = e.target.value
    setInputs(preValue => ({ ...preValue, [name]: value }))

  }

  const changepwd = (e) => {
    alert("called");
    console.log("login", inputs);
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      headers: { Authorization: token },
      url: "http://192.168.1.143:8008/user/changePassword",
      data: inputs,

      // status:""
    }).then((response) => {
      console.log("change password", response.data);
      // console.log(response.data.status);
      if (response.data.status) {
        navigate('/headersnav');



      }

    }, error => {
      console.log(error);
    })

  }
  return (
    <div className='forgotpassword'>
      <div className='col-lg-6 offset-lg-3'>
        {/* <div className='card' > */}
          <div className='row' >

            <div className='card' style={{ marginTop: "220px" }}>

            <div className='row' style={{ marginTop: "10px" }}>
              <div className='col-6'>
                <labe>Old Password</labe>
              </div>
              <div className='col-4'>
                <input type="text" name="oldPassword" value={inputs.oldPassword || ""} onChange={(e) => { handleOnChnage(e) }} />
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

            <div className='row' style={{ marginTop: "10px", marginBottom: "10px" }}>
              <div className='col-4'>
                <button className='btn btn-warning'><Link to={'/headersnav'}>Back</Link></button>

              </div>
              <div className='col-6'>
                <button className='btn btn-primary' onClick={changepwd}>submit</button>
              </div>
            </div>
            </div>
          </div>
        {/* </div> */}
      </div>

    </div>
  )
}

export default ChangePassword