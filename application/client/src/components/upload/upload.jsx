import '../upload/upload.css';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {FcAddImage} from 'react-icons/fc'
// import Image from '../../assets/image.png'
import {AiOutlineVideoCameraAdd} from 'react-icons/ai'

import { HiPhoto } from "react-icons/hi2";
import dummyData from '../../context/dummyData';
import axios from 'axios';


const Share = () => {

  const {currentUser} = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    console.log(event.target.value);
    setText(event.target.value);
  }

  const handleFileChange = (e) => {
    console.log("handling file");
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handling make post");
    console.log("user: " + currentUser.name);
    console.log(file);

    if (currentUser.name && (text || file)) {
      let createPostRequest = "http://localhost:4000/posts/";
      
        try {
          const formData = new FormData();
          if (file) {
          // Append the file to the FormData object
          formData.append('media', file);
  
          // Append other data to the FormData object
          formData.append('postDescription', text);
          formData.append('authorId', currentUser.id);
          }
          else {
            formData = {
              postDescription: text,
              authorId : currentUser.id
            }
          }
  
          // Make a POST request using Axios with the FormData
          console.log(formData);
          const response = await axios.post(createPostRequest, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          // Handle the response as needed
          console.log('Response:', response.data);
        } catch (error) {
          // Handle errors
          console.error('Error:', error);
        }
    }
  }


  return (


    <form className='postForm'>
       
        <div className="user form-top">
            <img src={dummyData.map(user=>(user.ProfieImage))} alt="" />
            <input onChange={handleTextChange} value={text} type="text" placeholder="What's on your mind ?" />
            <button onClick={handleSubmit} type='submit' className='btn btn-primary'>Post</button>
        </div>

      <div className="post-categories">
          <label htmlFor="file">
              <input onChange={handleFileChange} type="file" id='file'/>
            <span><HiPhoto style={{ width: '25px', height: '25px' }} /> Photos</span>
          </label>
          <label htmlFor="file">
              <input type="file" id='file' />
              {/* <span><FcAddImage /> Videos</span> */}
          </label>
      </div>


    {/* <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input onChange={handleTextChange} value={text} type="text" placeholder={`Input your text here`}
           />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input onChange={handleFileChange}  type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
              <div className="item">
                <span></span>
                <img src={Image} alt="" />
                <AiOutlineVideoCameraAdd/>
                
              </div>
            </label>
            <div className="item">
              <img src='' alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleSubmit}>Post</button>
          </div>
        </div>
      </div>

    </div> */}
</form>
  );
};

export default Share;