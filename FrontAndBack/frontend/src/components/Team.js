import React from "react";
import "./team.css";
import mayar from "../assets/photos/Mayar.jpeg";
import nadeen from  "../assets/photos/Profile.jpg" ;
import kareem from "../assets/photos/Kareem.jpg";
import haneen from "../assets/photos/Haneen.jpg" ;
import inzo from "../assets/photos/Inzo.jpg";
import zarka from "../assets/photos/zarka2.jpeg";

export default function Team() {

  const handleContact= (recipientEmail) => {
    const mailtoLink = `mailto:${recipientEmail}`;
    window.location.href = mailtoLink;
  };


  return (

    <>
    <div class="team">
    <div class="row">

    <div class="column">
      <div class="card">
        <img src={zarka} alt="zarka" style={{width:"200px", height:"200px"}}/>
        <div class="container-team">
          <h2>Abdelrahman Elzarka</h2>
          <p class="title">Student</p>
          <p>Software Engineer</p>
          <p >abdelrahmanelzarka18@gmail.com</p>
          <p><button class="button" onClick={() => handleContact("abdelrahmanelzarka18@gmail.com")} >Contact</button></p>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="card">
        <img src={inzo} alt="inzo" style={{width:"200px", height:"200px"}}/>
        <div class="container-team">
          <h2>Abdelrahman Mostafa</h2>
          <p class="title">Student</p>
          <p>Software Engineer</p>
          <p>abdomostafa7777000@gmail.com</p>
          <p><button class="button"  onClick={() => handleContact("abdomostafa7777000@gmail.com")}>Contact</button></p>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="card">
        <img src={kareem} alt="kareem"style={{width:"200px", height:"200px"}}/>
        <div class="container-team">
          <h2>Kareem Akram</h2>
          <p class="title">Student</p>
          <p>Software Engineer</p>
          <p>kareem.akram57@gmail.com</p>
          <p><button class="button"  onClick={() => handleContact("kareem.akram57@gmail.com")} >Contact</button></p>
        </div>
      </div>
    </div>
  
  
    <div class="column">
      <div class="card">
        <img src={mayar} alt="Mayar" style={{width:"200px", height:"200px"}}/>
        <div class="container-team">
          <h2>Mayar Elkhatib</h2>
          <p class="title">Student</p>
          <p>Software Engineer</p>
          <p>mmm.alkhatieb@gmail.com</p>
          <p><button class="button"  onClick={() => handleContact("mmm.alkhatieb@gmail.com")}>Contact</button></p>
        </div>
      </div>
    </div>
  
    <div class="column">
      <div class="card">
        <img src={haneen} alt="haneen" style={{width:"200px", height:"200px"}}/>
        <div class="container-team">
          <h2>Haneen Hossam</h2>
          <p class="title">Student</p>
          <p>Software Engineer</p>
          <p>eldalyhaneen@gmail.com</p>
          <p><button class="button"  onClick={() => handleContact("eldalyhaneen@gmail.com")}>Contact</button></p>
        </div>
      </div>
    </div>
  
  

    <div class="column">
      <div class="card">
        <img src={nadeen} alt="nadeen" style={{width:"200px", height:"200px"}}/>
        <div class="container-team">
          <h2>Nadeen Medhat</h2>
          <p class="title">Student</p>
          <p>Software Engineer</p>
          <p>nadeenmedhat217@gmail.com</p>
          <p><button class="button" onClick={() => handleContact("nadeenmedhat217@gmail.com")}>Contact</button></p>
        </div>
      </div>
    </div>
  
    
  </div>
 
  </div>
</>

  );
}
