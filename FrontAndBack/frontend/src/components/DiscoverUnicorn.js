import React from 'react';
import VR from "../assets/photos/VR.jpg";
import "./discoverUnicorn.css";

const BlackBox = () => {
    return (
      <div className="black-box">
        <h2 style={{ marginBottom: '2rem' }}>DISCOVER UNICORN HYBRID BLACK: THE WEARABLE EEG HEADSET</h2>
        <hr></hr>

        <p style={{ marginBottom: '3rem' }}>Are you a neuroscientist, engineer, artist, or programmer? 
            Or perhaps a creative mind ready to explore the fascinating world of brain signals and brain-computer interfaces? 
            Say hello to the Unicorn Hybrid Black, the cutting-edge wearable EEG headset.</p>
        

        <ul style={{ marginBottom: '3rem' ,listStyleType: 'circle', color: 'white' }}>
          <li> <b>High-Quality Data:</b> Unicorn Hybrid Black ensures you get the accurate and reliable data you need.</li>
          <li> <b>Versatility:</b> Perfect for a variety of applications, from scientific research to creative projects.</li>
          <li> <b>User-Friendly:</b> Easy to set up and use, making it accessible for both beginners and experts.</li>
        </ul>

        <p style={{ marginBottom: '3rem' }}>With the Unicorn Hybrid Black, let your innovative ideas come to life. 
            Access your brain’s potential with this high-quality EEG headset from g.tec medical engineering GmbH.</p>
        <ul style={{ listStyleType: 'circle', color: 'white' }}>
            <li> <b>Motor Imagery Based BCIs:</b> Electrodes placed over the sensorimotor cortex.</li>
            <li> <b>P300 Paradigms:</b> Electrodes positioned over the central, parietal, and occipital areas.</li>
            <li> <b>SSVEP and Code-Based VEP Paradigms:</b> Electrodes located over the parietal regions.</li>
        </ul>
        <p style={{ marginBottom: '3rem' }}>Reference and ground EEG electrodes are securely fixed on the mastoids of the user, 
            ensuring stable and accurate readings.</p>
        
        <hr/>

      </div>
    );
  };
  
  export default BlackBox;