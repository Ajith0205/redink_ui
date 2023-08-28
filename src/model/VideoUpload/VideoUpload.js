import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../home_nav/Profile.css'

function VideoUpload() {

    const [videoUrls, setVideoUrls] = useState([]);
    const [url, setUrl] = useState();

    useEffect(() => {
        allVideos()
    }, [])
    const token = localStorage.getItem("token");
    // console.log("token",token);

    const config2 = {

        headers: { Authorization: `${token}` },
        // 'content-type': 'multipart/form-data',

    }
    const config1 = {
        headers: { Authorization: `${token}` },
        responseType: "blob",
        'content-type': 'application/json',
    };


    const allVideos = () => {
        // axios.get("http://192.168.1.143:8008/videoUpload/videoList",  headers: { Authorization: token })
        axios({
            method: "get",
            headers: { Authorization: token },
            url: "http://192.168.1.143:8008/videoUpload/videoList",
            //data:inputs
        }).then((response) => {
            console.log(response);
            // setEventData(response.data.dto.eventList)

            setVideoUrls(response?.data?.dto?.videoUploadsList)
        }, error => {
            console.log(error);
        })



    }
    const isButtonVisible = false;

    // useEffect(()=>{
    //     downloadVideo()
    // },[])

        // const downloadVideo1 = (videoId) => {
        //   axios({
        //     url: `http://192.168.1.143:8008/videoUpload/download/${videoId}`,
        //     method: 'GET',
        //     responseType: 'blob',
        //     headers: {
        //         Authorization: `${token}`, // Replace with your actual token
        //       },
        //   })
        //     .then((response) => {
        //       const blob = new Blob([response.data], { type: 'video/mp4' });
        //       const url = URL.createObjectURL(blob);
        //       const link = document.createElement('a');
        //       link.href = url;
        //       link.download = 'video.mp4';
        //       document.body.appendChild(link);
        //       link.click();
        //       URL.revokeObjectURL(url);
        //     })
        //     .catch((error) => {
        //       console.error('Error downloading video:', error);
        //     });
        // };




    const downloadVideo = (id) => {
    console.log("url","http://192.168.1.143:8008/videoUpload/downloadVideo/"+ id);
        axios.get("http://192.168.1.143:8008/videoUpload/downloadVideo/"+id, config1).then((res) => {
                console.log("dfdfddgg", res);
                const href = URL.createObjectURL(res.data);

                var filename = res.headers.pragma;
                const link = document.createElement("a");
                link.href = href;
                link.target = "_blank";
                link.setAttribute("download", filename); //or any other extension
                document.body.appendChild(link);
                link.click();
            }).catch((error) => {
                console.error('Error during download:', error);
            });
    }




//    const downloadVideo = (id) => {
//         const videoUrl =  ("url", "http://192.168.1.143:8008/videoUpload/downloadVideo/"+id ); 
        
//         axios.get(videoUrl, {
//           responseType: 'blob', // Set the response type to 'blob'
//         })
//         .then(response => {
//           const blob = new Blob([response.data], { type: 'video/mp4' });
//           const url = URL.createObjectURL(blob);
//           const link = document.createElement('a');
//           link.href = url;
//           link.setAttribute('download', 'video.mp4');
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//         })
//         .catch(error => {
//           console.error('Error downloading video:', error);
//         });
//       }



    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const [multiSelectedFile, setMultiSelectedFile] = useState(null);
    const [multititle, setMultiTitle] = useState('');
    const [multidescription, setMultiDescription] = useState('');

    const handleFileChange = (event) => {
        // alert("in");
        console.log("event", event?.target?.files[0]);
        setSelectedFile(event?.target?.files[0]);
    };

    const handleMultiFileChange = (e) => {
        console.log("...e.target.files", e.target.files);
        const filesArray = Array.from(e.target.files);
        setMultiSelectedFile(filesArray)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleMultiTitleChange = (event) => {
        setMultiTitle(event.target.value);
    };

    const handleMultiDescriptionChange = (event) => {
        setMultiDescription(event.target.value);
    };

    const handleUpload = () => {

        const url = "http://192.168.1.143:8008/videoUpload/upload?title=" + title + "&description=" + description;
        const formData = new FormData()
        formData.append('file', selectedFile)
        // formData.append('fileName', selectedFile.name)

        // console.log("url", url);
        // console.log("formdata", formData);
        // console.log("config2", config2);

        axios.post(url, formData, config2).then((res) => {
            if (res.data?.status) {
                console.log("Upload", res);
                allVideos()
            }
        })
    }

    const handlemultiUpload = () => {
        // alert("in")
        const url = "http://192.168.1.143:8008/videoUpload/uploadVideos?title=" + multititle + "&description=" + multidescription;
        const formData = new FormData();
        // formData.append('files', multiSelectedFile);
        // Append all selected files to the formData
        multiSelectedFile.forEach((file) => {
            console.log("file", file);
            formData.append('file', file);
        });
        // console.log("url", url);
        // console.log("formdata", formData);
        // console.log("config2", config2);

        axios.post(url, formData, config2).then((res) => {
            if (res.data?.status) {
                // console.log("multiUpload", res);
                allVideos()

                setMultiDescription("")
                setMultiTitle("")
                setMultiSelectedFile("")
                window.location.reload();

            }
        })
    }

    return (
        <div>
            <div className='row'>
                <div className='card'  style={{backgroundColor:"#7CBFB6"}} >

                    {/* <div className='col-lg-6 '> style={{ marginTop: "200px", marginBottom: "100px" }}
                    <div className='card'>
                        <h3>Single Video Upload</h3>
                        <div className='card'>
                            <div className='row' style={{ marginTop: "30px" }}>
                                <div className='col-4'>
                                    <label className='form-controller'>videos</label>
                                </div>
                                <div className='col-4'>
                                    <input type="file" onChange={handleFileChange} />
                                </div>
                            </div>

                            <div className='row' style={{ marginTop: "5px" }}>
                                <div className='col-4' >
                                    <label className='form-controller'>Tiltle</label>
                                </div>
                                <div className='col-4'>
                                    <input type="text" name="title" value={title} onChange={handleTitleChange} />
                                </div>
                            </div>
                            <div className='row' style={{ marginTop: "5px" }}>
                                <div className='col-4'>
                                    <label className='form-controller'>Description</label>
                                </div>
                                <div className='col-4'>
                                    <input type="text" name="description" value={description} onChange={handleDescriptionChange} />
                                </div>
                            </div>

                            <div className='row' style={{ marginTop: "10px", marginBottom: "20px" }}>
                                <div className='col-3'>
                                   
                                </div>
                                <div className='col-3'>
                                   
                                </div>
                                <div className='col-2'>
                                    <button className='btn btn-success' onClick={handleUpload}  >Upload</button>
                                </div>
                            </div>
                        </div>

                    </div>



                </div> */}
                    <h3 style={{marginTop:"50px"}}> Video Upload</h3>

                    <div className='col-lg-6 offset-3'>
                        {/* <div className='card'> */}

                        <div className='card'>
                            <div className='row' style={{ marginTop: "30px" }}>
                                <div className='col-4'>
                                    <label className='form-controller'>videos</label>
                                </div>
                                <div className='col-4'>
                                    <input type="file" multiple onChange={handleMultiFileChange} />
                                </div>
                            </div>

                            <div className='row' style={{ marginTop: "5px" }}>
                                <div className='col-4' >
                                    <label className='form-controller'>Tiltle</label>
                                </div>
                                <div className='col-4'>
                                    <input type="text" name="title" value={multititle} onChange={handleMultiTitleChange} />
                                </div>
                            </div>
                            <div className='row' style={{ marginTop: "5px" }}>
                                <div className='col-4'>
                                    <label className='form-controller'>Description</label>
                                </div>
                                <div className='col-4'>
                                    <input type="text" name="description" value={multidescription} onChange={handleMultiDescriptionChange} />
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
                                    <button className='btn btn-success' onClick={handlemultiUpload}  >Upload</button>
                                </div>
                            </div>
                        </div>

                        {/* </div> */}



                    </div>

                    {videoUrls?.map((video => (
                        <div className='row' style={{ marginTop: "10px", alignItems: "center" }} >
                            {isButtonVisible ? (
                                <button className="col-lg-2 opacity-0 disabled">dd</button>
                            ) : null}
                            <div className='col-lg-7 ' onClick={() => (setUrl(video?.fileName), document.getElementById('videoprev').load())} >
                                <video className='gallery_item_video' style={{ cursor: 'pointer' }} data-bs-target="#viewgalleryvideo" data-bs-toggle="modal" autoPlay loop muted>
                                    <source src={video?.fileName} />
                                </video>
                            </div>

                            <button className='col-lg-1 '  style={{ alignItems: "center", marginLeft: "50px",color:"red" }} 
                            onClick={() => downloadVideo(video?.id)}
                            // onClick={() => downloadVideo1(video?.id)}

                              >Download video</button>
                        </div>


                    )))}
                </div>

                {/* <div className="modal fade" id="viewgalleryvideo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
                <div className="modal-dialog modal-lg  modal-dialog-centered modal-dialog-zoom">
                    <div className="modal-content custum_modal_content mx-auto">
                        <div className="modal-body home_image">
                            <div className="img_container" >
                                <div className="overlayText">
                                    <button type="button" className="btn btn-link" onClick={() => { document.getElementById('videoprev').pause() }} data-bs-dismiss="modal" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </button>
                                </div>
                                <video id='videoprev' className='preview_video' style={{ cursor: 'pointer' }} src={url} type='video/mp4' autoPlay loop controls />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

                {/* <!-- Button trigger modal --> */}
                {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Launch demo modal
</button> */}

                {/* <!-- Modal --> */}
                <div class="modal fade" id="viewgalleryvideo" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            {/* <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" class="close  btn" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div> */}
                            <div className="modal-body home_image">
                                <div className="overlayText">
                                    <div class="right-button">
                                        <button type="button" className="btn btn-link" onClick={() => { document.getElementById('videoprev').pause() }} data-bs-dismiss="modal" aria-label="Close">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                                <div className="img_container" >

                                    <video id='videoprev' className='preview_video' style={{ cursor: 'pointer' }} src={url} type='video/mp4' autoPlay loop controls />
                                </div>
                            </div>
                            {/* <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div> */}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default VideoUpload
