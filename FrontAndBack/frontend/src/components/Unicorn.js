import React from 'react';
import UHB from "../assets/photos/UHB.jpg";
import "./unicorn.css";

const WhiteBox = () => {
    return (
      <div className="white-box">
        <h1><b>UNICORN HYBRID BLACK</b></h1>
        <img src= {UHB} alt="Unicorn Hybrid Black" />
        <h1>8 CHANNELS <br/>EEG <br/>HEADSET</h1>
      </div>
    );
  };
  
  export default WhiteBox;