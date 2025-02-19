import "./profile.css";
import Posts from "../../components/posts/Posts"
import {CgMoreO} from 'react-icons/cg'
import { AuthContext,  } from "../../context/authContext";
import { useContext, useState } from "react";
import axios from 'axios';

const Profile = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // const {currentUser, setCurrentUser} = useContext(AuthContext);
  const {currentUser, setCurrentUser} = useContext(AuthContext);
  console.log(currentUser);

  console.log(isLoggedIn);
  axios.get("http://localhost:4000/users/profile",{withCredentials: true,})
  .then(response => {
    console.log(response.data);
    // if(response.data){
      // var {UserID, FirstName, LastName, Email} = response.data;
      // setUser({
      //   id: UserID,
      //   name: FirstName + " " + LastName,
      //   email : Email,
      //   profilePic:
      //     "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
      // });
    //   console.log(user);
    // }

  })
  .catch(error => console.log(error));

  return (
    
    <div className="profile">
      <div className="images">
        <img
          //src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
          src={currentUser.coverPic}
          alt=""
          className="cover"
        />
        <img
          //src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
          src={currentUser.profilePic}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">

          </div>
          <div className="center">
            <span>{currentUser.name}</span>
            <div className="info">
              <div className="item"> 
              <span>My name is VJ and I'm majoring in computer science</span>              
              </div>
              <div className="item">
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <CgMoreO />
          </div>
        </div>
      <Posts request={"http://localhost:4000/posts/myPosts"}/>
      </div>
    </div>
  );
};

export default Profile;
