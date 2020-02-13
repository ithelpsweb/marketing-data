import React  from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function LineGraph(props) {

  if(!props.data || props.data.length==0)
    var data = [];
  else
   var data = props.data;

  return (
      <div>
        <LineChart width={800} height={400} data={data} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
          <Line yAxisId="left" type="monotone" dataKey="Clicks" stroke="blue" />
          <Line yAxisId="right" type="monotone" dataKey="Impressions" stroke="red" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <YAxis yAxisId="left" orientation="left" label={{ value: 'Clicks', angle: -90,position:'left'}} />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'Impressions (1000)', angle: 90,position:'right'}} />
          <XAxis dataKey="Date" />
          <Tooltip />
          <Legend />
        </LineChart>
      </div>
  );
}
