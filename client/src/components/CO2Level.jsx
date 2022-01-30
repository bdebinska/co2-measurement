import React from "react";

function CO2Level(props) {
  return (
    <div className="co2LevelDisplay" style={{backgroundColor: props.color}}>
      <h2 className="buttonHeading">{props.heading}</h2>
      <h3 className="co2Heading">{props.message}</h3>
      <p className="co2Value">{!props.co2Level ? "Loading..." : props.co2Level}</p>
    </div>
  )
}

export default CO2Level;
