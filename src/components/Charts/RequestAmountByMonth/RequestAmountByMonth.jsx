import React, { Fragment, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import MyCard from "../../Card/Card";
import axiosClient from "../../../utils/clientAxios";

export const RequestAmountByMonth = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosClient.get('/requests/count-requests-by-month');
        setData(response.data.result.map(({ count, ...rest }) => ({ Requests: count, ...rest })));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const RequestAmountByMonthComponent = (
    <AreaChart
      width={1000}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip label='Hello' />
      <Area type="monotone" dataKey="Requests" 
      stroke="#EA7A9A" strokeWidth={5}
      fill="#FEEEE9" />
    </AreaChart>
  );
  return (
    <Fragment>
      {
        data && <MyCard title="Total requests in month" content={RequestAmountByMonthComponent} />
      }
    </Fragment>
  );
};

