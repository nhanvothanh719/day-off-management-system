import React, { Fragment, useEffect, useState } from "react";
import MyCard from "../../Card/Card";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import axiosClient from "../../../utils/clientAxios";

export const RequestStatusChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosClient.get(
          "/requests/count-requests-by-status"
        );
        setData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const COLORS = ["#FEA0B9", "#FEEEE9", "#313261"];

  const RequestStatusChartComponent = (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        innerRadius={100}
        outerRadius={130}
        fill="#8884d8"
        paddingAngle={5}
        nameKey="status"
        dataKey="count"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );

  return (<Fragment>
  {
    data &&
    <MyCard title="Total requests by status" content={RequestStatusChartComponent} />
  }
</Fragment>);
};
