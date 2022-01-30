import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function History(props) {

  const historicalData = [{name: "a", value: 2000}, {name: "b", value:3000}, {name: "c", value: 400}, {name: "d", value: 600}];

  function addData() {

  }

  return (
    <div className="history">
      <ResponsiveContainer width="80%" height="80%">
        <LineChart data={historicalData}>
          <CartesianGrid stroke="#ccc" />
          <YAxis />
          <Tooltip />
          <Line type="monotone"
            strokeDashrarray="3 3"
            dataKey="value"
            stroke="#423F3E"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default History;
