import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function History(props) {

  return (
    <div className="history">
      <h1 className="historyHeading">CO2 Level</h1>
      <h2>Past 20 measurements over time.</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={props.historicalData} margin={{top: 30, right: 0, bottom: 10, left: 20}}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dy={10} reversed="true" unit="s ago" />
          <YAxis type="number" domain={[0, 3500]} unit="ppm" />
          <Tooltip />
          <Line type="monotone"
            dataKey={(v) => v}
            stroke="#423F3E"
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default History;
