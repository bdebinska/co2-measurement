import React, {useState, useEffect} from "react";
import Heading from "./Heading";
import History from "./History";
import CO2Level from "./CO2Level";

function App() {
  const [[averageCo2Level, currentCo2Level, message, color], setData] = useState(["", "", ""]);

  useEffect(() => {
    function getData() {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => setData([data.averageCo2Level, data.co2Level, data.message, data.color]));
    }
    getData();
    setInterval(() => {
      getData();
    }, 10000);
  },[]);

  return (
    <div className="App">
      <Heading />
      <div className="container">
        <History />
        <div className="co2LevelDisplays">
          <CO2Level heading="Current Co2 Level" co2Level={currentCo2Level} color={color} message={message} />
          <CO2Level heading="Average Co2 Level" co2Level={averageCo2Level} color={color} message={message} />
        </div>
      </div>
    </div>
  );
}

export default App;
