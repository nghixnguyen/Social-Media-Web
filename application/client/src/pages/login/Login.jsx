// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";
// import "./login.css";
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate(); 
//   const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); 

//   function handleChange(event) {
//     if (event.target.type === "email") {
//       setEmail(event.target.value);
//     } else {
//       setPassword(event.target.value);
//     }
//   }

//   const handleLogin = (event) => {
//     event.preventDefault();

//     setError("");

//     axios.post('http://localhost:4000/login', {
//       email: email,
//       password: password,
//     }, { withCredentials: true })
//       .then(response => {
//         if (response.data.isLoggedIn) {
//           setIsLoggedIn(true);

//           const { UserID, FirstName, LastName, Email } = response.data.user;
//           setCurrentUser({
//             id: UserID,
//             name: FirstName + " " + LastName,
//             email: Email,
//             profilePic: "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
//           });

//           navigate("/");
//         } else {
//           setError("Invalid email or password. Please try again."); 
//         }
//       })
//       .catch(error => {
//         setError("An error occurred. Please try again later."); 
//         console.log(error);
//       });
//   };

//   return (
//     <div className="login">
//       <div className="card">
//         <div className="left">
//           <h2>EduMingle</h2>
//           <span>Don't you have an account?</span>
//           <Link to="/register">
//             <button>Register</button>
//           </Link>
//         </div>
//         <div className="right">
//           <h1>Login</h1>
//           <form>
//             <input type="email" placeholder="Email" onChange={handleChange} />
//             <input type="password" placeholder="Password" onChange={handleChange} />
//             <button onClick={handleLogin}>Login</button>
//           </form>
//           {error && <p className="error">{error}</p>} 
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  }

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    axios
      .post(
        "http://localhost:4000/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
          console.log(response.data.user);
          const { UserID, FirstName, LastName, Email, PathToProfilePicture, PathToCoverPicture } = response.data.user;
          setCurrentUser({
            id: UserID,
            name: FirstName + " " + LastName,
            email: Email,
            profilePic: PathToProfilePicture ? PathToProfilePicture : "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
            coverPic : PathToCoverPicture ? PathToCoverPicture : "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
            
          });

          navigate("/");
        } else {
          setError("Invalid email or password. Please try again.");
        }
      })
      .catch((error) => {
        setError("An error occurred. Please try again later.");
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2>EduMingle</h2>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={password}
            />
            <button onClick={handleLogin}>Login</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;

