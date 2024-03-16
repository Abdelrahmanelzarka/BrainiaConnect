import React from "react";
import "./footer.css";
import logo from "../assets/photos/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faTwitter,faLinkedinIn,faInstagram } from '@fortawesome/free-brands-svg-icons'

/*
01212e
*/


export default function Footer() {



  return (

    <footer class="footer ">
    <div class="container">
     <div class="row">

     <img src={logo} alt="logo" style={{width:"220px", height:"180px"}}/>
       <div class="footer-col">
         <h4>company</h4>
         <ul>
           <li><a href="#">Home</a></li>
           <li><a href="#">About</a></li>
           <li><a href="#">Start</a></li>
           <li><a href="#">Sign in</a></li>
         </ul>
       </div>

       
       
       
       <div class="footer-col">
         <h4>follow us</h4>
         <div class="social-links">
           <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
           <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
           <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
           <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
         </div>
       </div>

       <div class="legal">
       <p>Terms & Conditions | Privacy Policy | Accesibilty | Legal</p>
    <p style={{marginRight:"40px"}}>&copy; 2024 BrainiaConnect. All rights reserved.</p>
    
  </div>

     </div>
    </div>
 </footer>
  );
}
