import React from 'react'
import MyCard from '../../Card/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const GroupRequestChart = () => {
    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
      ];

    const GroupRequestChartComponent = (

        <BarChart
          width={600}
          height={300}
          data={data}
          barSize={20}
          barGap={10}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="pv" fill="#E97C9A" />
        </BarChart>

    );

  return (
    <MyCard title="Chart 2" content={GroupRequestChartComponent} />
  )
}