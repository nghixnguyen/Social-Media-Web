import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  function handleChange(event){
    var value = event.target.value;
    //console.log(event.target.name);
    switch(event.target.name){
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "fName":
        setFName(value);
        break;
      case "lName":
        setLName(value);
        break;
      default:
        break;
    }
    // event.preventDefault();
  }

  function handleClick(event){
    console.log(fName);
    console.log(lName);
    axios.post("http://localhost:4000/signup", {
      email : email,
      password : password,
      fName : fName,
      lName : lName,
    })
    .then(response => {
      console.log(response.data)
      if (response.data.isRegistered){
        navigate("/login");
      }
    })
    .catch(error => console.log(error));
    event.preventDefault();
  }
  
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h2>EduMingle</h2>

          <span>Do you have already an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
 
            <input value={email} type="email" name="email" placeholder="Email"  onChange={handleChange}/>
            <input  type="text" name="fName" placeholder="first name"  onChange={handleChange}/>
            <input  type="text" name="lName" placeholder="last name"  onChange={handleChange}/>
            <input type="password" name="password" placeholder="Password"  onChange={handleChange}/>
            <input type="password" placeholder="Confirm Password"  onChange={handleChange}/>


            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
