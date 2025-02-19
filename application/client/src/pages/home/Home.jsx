import Posts from "../../components/posts/Posts"
import "./home.css"
// import share from '../../components/upload/upload.jsx'
import { AuthContext,  } from "../../context/authContext";
import { useContext, useState } from "react";
import Share from "../../components/upload/upload.jsx";

const Home = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  
  console.log(isLoggedIn);
  return (
    <div className="home">
    <Share/>
      <Posts request={'http://localhost:4000/posts/getPosts'}/>
      

    </div>
  )
}

export default Home