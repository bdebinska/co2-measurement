import React, {useState, useEffect} from "react";

function App() {

  const [[co2Level, message, color], setData] = useState(["", "", ""]);

useEffect(() => {

    function getData() {
        fetch("/api")
          .then((res) => res.json())
          .then((data) => setData([data.co2Level, data.message, data.color]));
    }
    getData();
    setInterval(() => {
      getData();
    }, 10000);
    },
   []);

  return (
    <div className="App">
      <div><p>History</p></div>
      <div className="co2LevelDisplay" style={{backgroundColor: color}}>
        <h1>{message}</h1>
        <p>{!co2Level ? "Loading..." : co2Level}</p>
      </div>
      <div><p>What does it mean?</p></div>
    </div>
  );
}

export default App;
