//jshint esversion:6

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// min and max values of co2 level
const min = 400;
const max = 3500;

// getCo2Level() generates a random number between min and max inclusive
function getCo2Level(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getAverage(arr) {
  return Math.floor(arr.reduce((a,b) => a + b, 0) / arr.length)
}

var i = 0;
let currentCo2Level = getCo2Level(min, max);
let prevCo2Level = null;
let [message, color] = setProperties(currentCo2Level);
let co2Levels = [currentCo2Level];
let averageCo2Level = getAverage(co2Levels);

// print a new co2 level with the timing every 10 seconds
setInterval(() => {
  prevCo2Level = currentCo2Level;
  i = i + 1;
  currentCo2Level = getCo2Level((prevCo2Level <= 700 ? min : prevCo2Level - 300), (prevCo2Level >= 3200 ? max : prevCo2Level + 300));

  // check if co2Levels is over 20 and if not, add a new measurement to it
  if (co2Levels.length >= 20) co2Levels.pop();
  co2Levels.unshift(currentCo2Level);

  averageCo2Level = getAverage(co2Levels)
  console.log(averageCo2Level);

  [message, color] = setProperties(averageCo2Level);
  console.log(currentCo2Level + " " + 10 * i + ' seconds');
}, 10000);

// setProperties() sets a value for message and color, depending on the value of co2Level
function setProperties(averageCo2Level) {
  if (averageCo2Level <= 1000) {
    return ["Good", "#2ECC71"];
  } else if (averageCo2Level > 2000) {
    return ["Too high", "#E74C3C"];
  } else {
    return ["Medium", "#F1C40F"];
  }
}

// send data to react app
app.get("/api", (req, res) => {
  res.json({
    averageCo2Level: averageCo2Level,
    co2Level: currentCo2Level,
    message: message,
    color: color
  });
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
