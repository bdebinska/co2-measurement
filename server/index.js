//jshint esversion:6

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// min and max values of co2 level
const min = 400;
const max = 3500;

// getCo2Level() generates a random number between min and max inclusive
function getCo2Level() {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var i = 0;
let co2Level = getCo2Level();
let [message, color] = setProperties(co2Level);

// prints a new co2 level with the timing every 10 seconds
setInterval(() => {
  i = i + 1;
  co2Level = getCo2Level();
  [message, color] = setProperties(co2Level);
  console.log(co2Level + " " + 10*i + ' seconds');
}, 10000);

function setProperties(co2Level) {
  if(co2Level <= 1000) {
    return ["Great!", "green"];
  } else if (co2Level > 2000) {
    return ["Bad", "red"];
  } else {
    return ["Medium", "yellow"];
  }
}

// send data to react app
app.get("/api", (req, res) => {
  res.json({co2Level: co2Level,
            message: message,
            color: color});
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
