import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import './DashboardPieChart.scss';

const DashboardPieChart = ({ allCamps }) => {
  const sortedCamps = allCamps.sort((c, b) => {
    return b.ratingsAverage - c.ratingsAverage;
  });
  const top5Camps = sortedCamps.slice(0, 5);

  const colors = [
    { color: '#ef4444' },
    { color: '#f97316' },
    { color: '#eab308' },
    { color: '#14b8a6' },
    { color: '#3b82f6' },
  ];
  for (let i = 0; i < top5Camps.length; i++) {
    top5Camps[i].color = colors[i].color;
  }

  return (
    <>
      <div className="pie">
        <h2 className="pie__header">Top camps with highest rate in 2023</h2>
        <ResponsiveContainer height={240}>
          <PieChart className="pie__layout">
            <Pie
              data={top5Camps}
              nameKey="name"
              dataKey="ratingsAverage"
              innerRadius={85}
              outerRadius={110}
              cx="50%"
              cy="50%"
              paddingAngle={3}
            >
              {top5Camps.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.ratingsAverage}
                />
              ))}
            </Pie>

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
        </ResponsiveContainer>
      </div>
    </>
  );
};
export default DashboardPieChart;
