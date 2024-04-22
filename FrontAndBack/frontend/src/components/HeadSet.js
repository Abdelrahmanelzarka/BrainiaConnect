import React from 'react';
import Headset from "../assets/photos/Headset.png";
import "./headSet.css";



export default function HeadSet() {
  

  return (
    <div className="media-card">
        <div>
        <h2>Unicorn Hybrid Black Headset</h2>
        <p>Unicorn Hybrid Black is a high-quality 
            wearable EEG-headset for brain-computer interface - BCI - applications
            to perfectly acquire brain waves.<br/>
            EEG data is sampled at 250 Hz per channel
            with 24-bit resolution.<br/>
            The patented Unicorn Hybrid EEG Electrodes allow users to record dry,<br/> or with gel and therefore enables usage for many different
            BCI applications.</p>
        </div>
        <div className="HeadSetImg">
            <img src={Headset} alt="Head Set Specs" />
        </div>
      
    </div>
  );
};
