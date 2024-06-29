import React from "react";
import "./footer.css";
import logo from "../assets/photos/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faTwitter,faLinkedinIn,faInstagram } from '@fortawesome/free-brands-svg-icons'



export default function Footer() {



  return (

    <footer class="footer " id="footer">
    <div class="container">
     <div class="row">

     <div  class="navbar-brand" style={{width:"220px", height:"180px"}}>
     <img src={logo} alt="logo" style={{width:"220px", height:"180px"}}/>
     </div>

       <div class="footer-col">
         <h4>company</h4>
         <ul>
           <li><a href="./">Home</a></li>
           <li><a href="./about">About</a></li>
           <li><a href="./gui">Start</a></li>
           <li><a href="./login">Sign in</a></li>
         </ul>
       </div>

       
       
       
       <div class="footer-col">
         <h4>follow us</h4>
         <div class="social-links">
           <a href="https://www.facebook.com/profile.php?id=100002059013899"><FontAwesomeIcon icon={faFacebook} /></a>
           <a href="https://www.instagram.com/abdelrahman_elzarka.7/"><FontAwesomeIcon icon={faInstagram} /></a>
           <a href="https://twitter.com/?lang=en"><FontAwesomeIcon icon={faTwitter} /></a>
           <a href="https://www.linkedin.com/in/abdelrahman-elzarka-software-engineer/"><FontAwesomeIcon icon={faLinkedinIn} /></a>
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
