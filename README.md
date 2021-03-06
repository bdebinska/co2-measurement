# co2-measurement
Simple CO2 level visualization.

## Server side
* Made with Node.js and Express.
* Generates a random CO2 level measurement every 10 seconds that differs by max. 300 ppm from the previous number.
* Sends the current CO2 level and the average CO2 level calculated from the past 20 measurements, appropriate colors
  and messages for both current and average CO2 level, and past 20 CO2 measurements.

## Client side
* Made with React.js and Recharts.
* Feches data from the server every 10 seconds and updates current CO2 level and average CO2 level.
* Generates a graph every 10 seconds with the past 20 CO2 level measurements.


## Live preview
[Click for live preview](https://co2-measurement.herokuapp.com/)
