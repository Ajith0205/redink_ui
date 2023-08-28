import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Base_Url } from "../Service/Constant";

function EditEventUpload(props) {



    var [eventData, setEventData] = useState([]);
  
    var navigate = useNavigate();
    const token = localStorage.getItem("token");
    // const id = props.id
    // console.log("id",id);

    const location = useLocation()
    const id= location.state.id;
   // console.log("id", id)
    useEffect(() => {
        axios({
          method: "get",
          headers: { Authorization: token },
          url: Base_Url+"event/findeventid?id="+id,
         
        }).then((response) => {
         // console.log(response);
         
          var eventupdate=response.data.dto.event;
          //console.log("hi",eventupdate);

          setEventData(eventupdate);
        
    
    
        }, error => {
          console.log(error);
        })
      }, [])

//console.log("adsad",eventData);


const handleOnUpdate =(e)=>{
  e.preventDefault();
   let name=e.target.name;
   
   if (name != "image") {
    let value = e.target.value;
    // console.log("name",value);
    setEventData(preValue => ({ ...preValue, [name]: value }))
  } else {
    let files = e.target.files;
    let fileReader = new FileReader();
   // console.log("shdfgshj",files);
    fileReader.readAsDataURL(files[0]);

    fileReader.onload = (event) => {
      let value = event.target.result;
    //  console.log("value", value)
      setEventData(preValue => ({ ...preValue, [name]: value }))
    }

  }


 

}


const update=()=>{

  axios({
    method: "PUT",
    headers: { Authorization: token },
    url: Base_Url+"event/update?id="+id,
    data: eventData,
  }).then((response) => {
    console.log(response);

    if (response.data.status) {
      navigate('/headersnav');
      window.location.reload(false)
    }
   
  })


}

  return (
    <div style={{ backgroundImage: `url("./timetoplay.webp")` }}>
    <div className='' >
      <React.Fragment>
        <div className='row' style={{ marginTop: "200px", marginBottom: "20px" }}>
          <div className='col-lg-6 offset-lg-3'>
            <div className='card'></div>
            <div className='card'>
              <div className='row' style={{ marginTop: "30px" }}>
                <div className='col-4'>
                  <label className='form-controller'>Event Details Photo</label>
                </div>
                <div className='col-4'>
                  <input type="file"   name="image" onChange={(e) => {handleOnUpdate(e) }}
                  /><img src={eventData?.image}   style={{ width: "300px", height: "300px" }} />
                  
                </div>
              </div>

              <div className='row' style={{ marginTop: "5px" }}>
                <div className='col-4' >
                  <label className='form-controller'>Event Name</label>
                </div>
                <div className='col-4'>
                  <input type="text" name="eventName"  value={eventData?.eventName}   onChange={(e) => {handleOnUpdate(e) }}/>
                </div>
              </div>

              <div className='row' style={{ marginTop: "5px" }}>
                <div className='col-4' >
                  <label className='form-controller'>Event Date</label>
                </div>
                <div className='col-4'>
                  <input type="Date" name="eventDate" value={eventData?.eventDate}   onChange={(e) => { handleOnUpdate(e) }}/>
                </div>
              </div>
              <div className='row' style={{ marginTop: "5px" }}>
                <div className='col-4'>
                  <label className='form-controller'>Event Place</label>
                </div>
                <div className='col-4'>
                  <input type="text" name="eventPlace" value={eventData?.eventPlace}  onChange={(e) => { handleOnUpdate(e) }} />
                </div>
              </div>

              <div className='row' style={{ marginTop: "10px", marginBottom: "20px" }}>
                <div className='col-3'>
                  {/* <Link to={''}>Forgotpassword?</Link> */}
                </div>
                <div className='col-3'>
                  {/* <Link to={'/register'}>Do You Create a Account?</Link> */}
                </div>
                <div className='col-2'>
                  <button className='btn btn-success' onClick={update} >Update</button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </React.Fragment>

    </div>
  </div>
  )
}

export default EditEventUpload