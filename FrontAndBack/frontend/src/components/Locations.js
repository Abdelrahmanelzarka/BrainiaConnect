import React from 'react';
import Locations from "../assets/photos/Locations.png";
import "./locations.css";

const GTechLocations = () => {
  return (
    <>
    <div className="gtech-locations">
      <div className="content-container">
        <h2>Find the G.Tech in your Country</h2>
        <hr></hr>
        <p>
          GTech has a global presence with campuses and research centers located
          around the world. Explore the vibrant communities where GTech researchers,
          faculty, and students are making a difference.
        </p>
        <h6>g.tec has it’s headquarters in Austria, Spain, USA , Canada, Japan and Hong Kong and local distributors all over the world.</h6>
      </div>
      <img
        src={Locations} // Replace with the path to your map image
        alt="GTech Global Locations Map"
      />
    </div>
    </>
  );
};

export default GTechLocations;