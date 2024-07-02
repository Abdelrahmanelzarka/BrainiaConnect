import React from 'react';
import Electrodes from "../assets/photos/Electrodes.jpg";
import './electrodes.css'; // Import the CSS file

const App = () => {
  return (
    <div className="container3">
      <img src={Electrodes} alt="EEG Electrodes" className="image" />
      <div className="content">
        <br/><br/><br/>
        <h1>HYBRID EEG ELECTRODES</h1>
        <hr></hr>
        <p>The Unicorn Hybrid EEG Electrodes are made of a conductive material that allows you to record dry or with gel.<br/> 
            Dry recordings are fast to setup. For better performance, conductive gel can be applied.<br/>
            Uncorn Hybrid EEG Electrodes provide a high flexibility and a practical solution for various EEG applications and contribute to the advancement of EEG technology.</p>
            <hr/>
      </div>
    </div>
  );
};

export default App;