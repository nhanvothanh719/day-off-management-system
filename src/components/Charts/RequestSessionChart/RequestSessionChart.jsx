import React, { useEffect, useState } from "react";
import MyCard from "../../Card/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import axiosClient from "../../../utils/clientAxios";

export const RequestSessionChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosClient.get('/requests/count-requests-by-day-off-session');
        setData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const RequestSessionChartComponent = (
    <BarChart 
    width={600} height={300} 
    data={data} barSize={50} barGap={10}
    style={{ fontSize: '18px' }}
    >
      <defs>
        <linearGradient id="linearPink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stopColor="#EB7D9C" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#EFC3B7" stopOpacity={0.45} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="session" />
      <YAxis />
      <Tooltip />

      <Bar dataKey="amount" stroke="#F6C3D1" fillOpacity={1} fill="url(#linearPink)" radius={10} />
    </BarChart>
  );

  return <MyCard title="Total requests by day off session" content={RequestSessionChartComponent} />;
};
