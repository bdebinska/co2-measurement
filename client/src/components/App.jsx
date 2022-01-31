import React, {useState, useEffect} from "react";
import History from "./History";
import CO2Level from "./CO2Level";

function App() {
  const [[averageCo2Level, currentCo2Level, averageMessage, averageColor,
     currentMessage, currentColor, co2Levels], setData] = useState([]);

  // fech data from the server every 10 seconds
  useEffect(() => {
    function getData() {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => setData([data.averageCo2Level, data.currentCo2Level,
          data.averageMessage, data.averageColor, data.currentMessage,
          data.currentColor, data.co2Levels]));
    }
    getData();
    setInterval(() => {
      getData();
    }, 10000);
  },[]);

  return (
    <div className="App">
      <div className="container">
        <History historicalData={co2Levels}/>

        <div className="co2LevelDisplays">
          <CO2Level heading="Current CO2 Level" co2Level={currentCo2Level} color={currentColor} message={currentMessage} />
          <CO2Level heading="Average CO2 Level*" co2Level={averageCo2Level} color={averageColor} message={averageMessage} />
          <p className="annotations">*Average CO2 level is based on the average from last 20 measurements.</p>
        </div>

      </div>
    </div>
  );
}

export default App;
