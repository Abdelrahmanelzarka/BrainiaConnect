import React from 'react';
import { GrCurrency, GrMagic, GrAchievement } from "react-icons/gr"; // Import icons from react-icons/gr
import "./bestFeatures.css";


export default function BestFeatures() {
  return (
    <div className="features-container">
        <div>
            <h1>Our Best Features</h1>
            <p className='ParagraphFeatures'>Our innovative approach <br/>with its Best Features: <br/>
            <ol>
                <li><b>Cost-Effective</b> compared to the other market solutions.</li>
                <li><b>Embedded Auto-Complete</b> to fasten the communication. </li>
                <li><b>Smooth & High Quality</b> User-Experience.</li>
            </ol>
            empower individuals with speech impairments <br/>
            to communicate through the power of <br/>just their thoughts.!</p>
        </div>
        <div className="circles-wrapper">
        <Circle icon={<GrCurrency size={40} color='green'/>} description="Cost-Effective Solution"/>
        <Circle icon={<GrMagic size={40} color='black'/>} description="Auto-Complete"/>
        <Circle icon={<GrAchievement size={40} color='darkgoldenrod' />} description="High Quality"/>
      </div>
    </div>
  );
}

function Circle({ icon, description }) {
    return (
        <div className="circle-item">
          <div className="icon-wrapper">{icon}</div>
          <p className="description">{description}</p>
        </div>
      );
};




