 //jshint esversion:6

const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// min and max values of co2 level
const min = 400;
const max = 3500;

// setProperties() sets a value for message and color, depending on the value of co2Level
function setProperties(co2Level) {
  if (co2Level <= 1000) {
    return ["Good", "#2ECC71"];
  } else if (co2Level > 2000) {
    return ["Too high", "#E74C3C"];
  } else {
    return ["Medium", "#F1C40F"];
  }
}

// getCo2Level() generates a random number between min and max inclusive
function getCo2Level(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// getAverage() calculates the average integer value of the passed array
function getAverage(arr) {
  return Math.floor(arr.reduce((a,b) => a + b, 0) / arr.length);
}

var i = 0;
// set all co2 levels
let currentCo2Level = getCo2Level(min, max);
let prevCo2Level = null;
let co2Levels = [currentCo2Level];
let averageCo2Level = getAverage(co2Levels);

// set message and color for co2 levels
[averageMessage, averageColor] = setProperties(averageCo2Level);
[currentMessage, currentColor] = setProperties(currentCo2Level);

// print a new co2 level with the timing every 10 seconds
setInterval(() => {
  prevCo2Level = currentCo2Level;
  i = i + 1;
  currentCo2Level = getCo2Level((prevCo2Level <= 700 ? min : prevCo2Level - 300),
   (prevCo2Level >= 3200 ? max : prevCo2Level + 300));

  // check if co2Levels is over 20 and if not, add a new measurement to it
  if (co2Levels.length >= 20) co2Levels.pop();
  co2Levels.unshift(currentCo2Level);

  averageCo2Level = getAverage(co2Levels);

  // set message and color for co2 levels
  [averageMessage, averageColor] = setProperties(averageCo2Level);
  [currentMessage, currentColor] = setProperties(currentCo2Level);
}, 10000);

// send data to react app
app.get("/api", (req, res) => {
  res.json({
    averageCo2Level: averageCo2Level,
    currentCo2Level: currentCo2Level,
    averageMessage: averageMessage,
    averageColor: averageColor,
    currentMessage: currentMessage,
    currentColor: currentColor,
    co2Levels: co2Levels
  });
});

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
