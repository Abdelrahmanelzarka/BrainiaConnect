import React from 'react';
import logo from "../assets/photos/logo.png";
import "./welcomeParagraph.css";

export default function welcomeParagraph () {


  return (
    <div className="image-paragraph-container">
      
      <div className="text-content">
        <h1 className="title" color='#01212e'>Say Hello to BrainiaConnect</h1>
        <p className="paragraph">An EEG & AI based Application, using just an EEG Headset and our Application,<br/>
         patients who have lost all hope in communicating can finally fit in and regain some of their
         lost independence by connecting with people again.</p>
      </div>
      <img src={logo} alt="BrainiaConnect Logo" className="circular-image" />
    </div>
  );
};