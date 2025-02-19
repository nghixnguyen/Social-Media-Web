import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import SearchList from '../SearchBar/SearchList'
import DarkMode from '../DarkMode/DarkMode'
import dummy from '../../context/dummyData'
import { IoChatboxEllipses } from "react-icons/io5";



// import { Dropdown } from 'flowbite-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  const [results, setResults] = useState([]);


  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/login"); 
  };

  return (
    <nav>
    <div className="nav-container">

      <div className="nav-left">
        <Link to='/'>
           <h3 className='logo'>EduMingle</h3>
        </Link>          
        {/* <div className="Nav-Searchbar"> */}
        {/* <FaSearch  />
        <input type="search" /> */}

            <div className="search-container">
         <SearchBar setResults={setResults}/>
          <searchList results = {results}/>
        {results && results.length > 0 && <SearchList results={results} />}

       {/* </div> */}
       {/* </div> */}
        </div>    
      </div>

      <div className="nav-right">
        <Link to='/Messages' >
        <IoChatboxEllipses style={{ width: '30px', height: '30px' }}/>           
        </Link>
        <DarkMode />
             {currentUser && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
        <Link to='/profile/id' >
          <div className="user">
            <img src={dummy.map(user=>(user.ProfieImage))} alt="" />
            <h4>Name</h4>
          </div>           
        </Link>          
      </div>


    </div>
  </nav>
    
    
  );
};

export default Navbar;
