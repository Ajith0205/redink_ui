import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import addNotification from 'react-push-notification';


function EventUpload() {

  var navigate = useNavigate();
  const [events, setEvents] = useState({});
  const handleOnChnage = (e) => {
    e.preventDefault();
    // console.log("inputs", events, e.target.value);
    //form controller name=name assined
    let name = e.target.name;
    if (name != "image") {
      let value = e.target.value;
      // console.log("name",value);
      setEvents(preValue => ({ ...preValue, [name]: value }))
    } else {
      let files = e.target.files;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);

      fileReader.onload = (event) => {
        let value = event.target.result;
        // console.log("value", value)
        setEvents(preValue => ({ ...preValue, [name]: value }))
      }



// let files = e.target.files;
// let file = files[0];

// if (file.size <= 1024 * 1024) {
//   let fileReader = new FileReader();
//   fileReader.readAsDataURL(file);

//   fileReader.onload = (event) => {
//     let value = event.target.result;
//     console.log("value", value);
//     setEvents((preValue) => ({ ...preValue, [name]: value }));
//   };
// } else {
//   console.log("File size exceeds the limit of 1MB.");
//   // You can display an error message or handle the oversized file in a different way.
// }



    }


  }
  const eventUploads = (e) => {

    // alert("called");
    // console.log("login", events);
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      headers: { Authorization: token },
      url: "http://192.168.1.143:8008/event/upload",
      data: events,

      // status:""
    }).then((response) => {
      console.log("Event Uploads", response.data)
      var notice=response.data.dto.event.image
      console.log("da",notice);
      // console.log(response.data.status);
      if (response.data.status) {
        addNotification({
          title:Event,
          post:notice?.image,
          // url:"http://localhost:3000/headersnav",
          duration:15000,
          
          native:true,

        onClick:()=>window.location="http://localhost:3000/headersnav"
         })
        navigate('/headersnav');
 

      }
      //var token=response.data.response.Authorization;
      // localStorage.setItem("token",token);





    }, error => {
      console.log(error);
    })

  }

  return (
    <div  className='eventupload' style={{ backgroundImage: `url("./timetoplay.webp")`,height:"100vh" }}>
      <div className='' >
        <React.Fragment>
          <div className='row' >
            <div className='colg-lg-6'></div>
            <div className='col-lg-6 ' style={{ marginTop: "300px", marginBottom: "20px",alignItems:"center",marginRight:"auto",marginLeft:"auto" }} >
              <div className='card'></div>
              <div className='card' >
                <div className='row' style={{ marginTop: "30px" }}>
                  <div className='col-4'>
                    <label className='form-controller'>Event Details Photo</label>
                  </div>
                  <div className='col-4'>
                    <input type="file" name="image" onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>

                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' >
                    <label className='form-controller'>Event Name</label>
                  </div>
                  <div className='col-4'>
                    <input type="text" name="eventName" value={events.eventName || ""} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>

                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4' >
                    <label className='form-controller'>Event Date</label>
                  </div>
                  <div className='col-4'>
                    <input type="Date" name="eventDate" value={events.eventDate || ""} onChange={(e) => { handleOnChnage(e) }} />
                  </div>
                </div>
                <div className='row' style={{ marginTop: "5px" }}>
                  <div className='col-4'>
                    <label className='form-controller'>Event Place</label>
                  </div>
                  <div className='col-4'>
                    <input type="text" name="eventPlace" value={events.eventPlace || ""} onChange={(e) => { handleOnChnage(e) }} />
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
                    <button className='btn btn-success' onClick={eventUploads} >Upload</button>
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

export default EventUpload