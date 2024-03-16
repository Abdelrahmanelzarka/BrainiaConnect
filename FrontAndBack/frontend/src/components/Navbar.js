import React from "react";
import "./navbar.css";
import { AiOutlineMenu } from "react-icons/ai";
import { Link} from "react-router-dom";
import logo from "../assets/photos/logo.png";

/*
01212e
*/


export default function Navbar() {



  return (

    <header
      id="header"
      className={`header fixed-top container-fluid  d-flex align-items-center `}
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
                  <Link className="nav-link scrollto" to="/" >
                    Contact
                  </Link>
                </li>


                <li className="li">
                  <Link className="nav-link scrollto" to="/" >
                    Start
                  </Link>
                </li>
            
         
          </ul>

          <button
            className="custom-toggler navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample09"
            aria-controls="navbarsExample09"
            aria-label="Toggle navigation"
          >
            <AiOutlineMenu />
          </button>
        </nav>

      </div>

           
  <div

className={`log-sign container-fluid container-xl d-flex align-items-center justify-content-end`}
  
  >
    <button class="log">Login</button>
    <button class="reg">Sign up</button>
   
  </div>

    </header>
  );
}
