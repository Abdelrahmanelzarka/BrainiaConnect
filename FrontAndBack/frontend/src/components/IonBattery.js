import React from 'react';
import IonBattery from "../assets/photos/IonBattery.jpg";
import './ionBattery.css'; // Import the CSS file

const Battery = () => {
  return (
    <div className="container4">
    
    <div className="content">
    <br/><br/><br/>
      <h1>POWERFUL LI-ION BATTERY AND ENHANCED SIGNAL QUALITY</h1>
      <hr></hr>
      <p>Achieve optimal digitization with a 24-bit ADC resolution and a high oversampling rate <br/>to enhance the signal-to-noise ratio.<br/> 
        A lightweight high-power Li-Ion battery with optimal performance, offering 3 hours of recording time, <br/>
        and conveniently charged via USB connection..</p>
        
    </div>
    <img src={IonBattery} alt="Ion-Battery" className="image" />
    </div>
  );
};

export default Battery;