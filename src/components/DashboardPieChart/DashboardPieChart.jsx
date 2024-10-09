import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import './DashboardPieChart.scss';

const DashboardPieChart = ({ allCamps }) => {
  const sortedCamps = allCamps.sort((c, b) => {
    return b.ratingsAverage - c.ratingsAverage;
  });
  const top5Camps = sortedCamps.slice(0, 5);
  const data = top5Camps.map((camp) => ({
    ...camp,
    ratingsAverage: Math.trunc(camp.ratingsAverage * 100) / 100,
    // ratingsAverage: Math.trunc(camp.ratingsAverage * 100),
  }));

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#14b8a6', '#3b82f6'];

  return (
    <>
      <div className="pie">
        <h2 className="pie__header">Top camps with highest rate in 2023</h2>
        <PieChart width={500} height={400} className="pie__layout">
          <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="ratingsAverage"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {/* <Pie
            data={data}
            cx={420}
            cy={200}
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            // fill="#8884d8"
            paddingAngle={5}
            dataKey="ratingsAverage"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie> */}

          <Tooltip />

          <Legend
            verticalAlign="middle"
            align="right"
            // width="45%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </div>
    </>
  );
};
export default DashboardPieChart;
