import React from "react";
import "./navbar.css";
import {useNavigate} from "react-router-dom";
import { Link} from "react-router-dom";
import logo from "../assets/photos/logo.png";
import axios from "axios";



export default function Navbar({user}) {

  const logOutUser = () => {
    
        axios.post('http://localhost:5000/logout')
        .then(function (response) {
            console.log(response);
            window.location.reload(true);;
          
        })
        .catch(function (error) {
            console.log(error, 'error');
        });
    }


  const handleFooterClick = () => {
    window.scrollBy(0, document.documentElement.scrollHeight);
  }


  return (

    <header
      id="header"
      className={`header fixed-top container-fluid  d-flex align-items-center`}
      style={{ backgroundColor:"white", padding:"0 20px"}}
    >
 


      <div
        className={`container-fluid container-xl d-flex align-items-center justify-content-start`}
        id="nav_div"
        style={{
          paddingTop: "0.5rem",
        }}
      >

       
          <Link
            to="/"
            className="navbar-brand"
            style={{ textDecoration: "none", marginLeft: "5px" , marginRight: "5px" }}
          > 
          <img src={logo} alt="logo" style={{width:"40px", height:"40px"}}/>
          </Link>

          
        
        <nav id="navbar" className="navbar">
          <ul>
            <li className="li">
              <Link className="nav-link scrollto active" to="/">
                Home
              </Link>
            </li>

           
             
                <li className="li">
                  <Link className="nav-link scrollto" to="/About">
                    About
                  </Link>
                </li>


                <li className="li">
                  <Link className="nav-link scrollto" onClick={handleFooterClick} >
                    Contact
                  </Link>
                </li>

{ user &&
                <li className="li">
                  <Link className="nav-link scrollto" to="/gui" >
                    Start
                  </Link>
                </li>}
            
         
          </ul>
         
        
        </nav>

      </div>

 
  <div
className={`log-sign container-fluid container-xl d-flex align-items-center justify-content-end`}
  >
     {   user==null && 
     <Link className="nav-link scrollto" to="/login" >            
    <button class="log">Log in</button>
                  </Link>}
                  {   user==null && 
    <Link className="nav-link scrollto" to="/signup" >
    <button class="reg">Sign up</button>
    </Link>}

    {   user && 
    
    <button class="log" onClick={logOutUser} >Log out</button>
    }
   
  </div>

    </header>
  );
}
