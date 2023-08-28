import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as yup from 'yup'
import addNotification from 'react-push-notification'
import { Base_Url } from '../Service/Constant'



function Login() {

  // const validation=yup.object().shape({
  //   username:yup.string().required(),
  //   password:yup.string().min(2).max(6).required(),
  //  // email:yub.object().String().email().required()
  // })

  const validation = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  })



  const [inputs, setInputs] = useState({});
  const valid = validation.isValid(inputs)
  var navigate = useNavigate();
  const handleOnChnage = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // console.log("name",value);
    setInputs(preValue => ({ ...preValue, [name]: value }))
    // if(valid=="true"){
    //   this.setInputs({isDisabled:true})
    // }else{
    //   this.setInputs({isDisabled:false})
    // }

  }
  const userLogin = (e) => {
    // alert("called");
    // console.log("login", inputs);


    // console.log("validation", valid)

    axios({
      method: "post",
      url: Base_Url + "user/login",
      data: inputs,

      // status:""
    }).then((response) => {
      console.log("Login Response", response.data);
      // console.log(response.data.status);
      if (response.data.status) {

        navigate('/headersnav', { state: { id: response.data.response.id } });

        //navigate('/register');
        var token = response?.data?.response?.Authorization;
        var id = response?.data?.response?.id;
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        localStorage.setItem("role", response?.data?.role)

      } else {

      }



      // console.log("login Response",response.data.response.information.message);


    }, error => {
      console.log(error);
    })
  }

  return (
    <div className='' >
      <React.Fragment>
        <div className='d-flex align-items-center justify-content-center' style={{ backgroundColor: "#F1B132", height: '100vh', display: 'flex', alignItems: 'center', justifyItems: 'center' }}  >

          <div className='col-lg-4' >
            <div className="text-center mb-3">
              <img src="/redInk.png" alt="Logo" className='logo-img' />
            </div>
            <div className='card'  >
              <div className='card-header border-0' ><h4 className='mb-0'>Login</h4> </div>
              <div className='card-body'>
                <div className='form-group mb-2' >

                  <label >UserName</label>
                  <input type="text" className='form-control' name="username" value={inputs.username || ""} onChange={(e) => { handleOnChnage(e) }} />

                </div>
                <div className='form-group mb-2' >
                  <label className='form-controller'>Password</label>
                  <input type="password" className='form-control' name="password" value={inputs.password || ""} onChange={(e) => { handleOnChnage(e) }} />

                </div>

                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-5' >
                    <Link to={'/otpsend'}>Forgotpassword?</Link>
                  </div>
                  <div className='col-2'>
                    {/* <Link to={'/register'}>Do You Create a Account?</Link> */}
                  </div>

                </div>
                <div className='text-center'>
                  <button className='btn btn-success' disabled={inputs ? false : true} onClick={userLogin}>Login</button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </React.Fragment>

    </div>
  )
}

export default Login