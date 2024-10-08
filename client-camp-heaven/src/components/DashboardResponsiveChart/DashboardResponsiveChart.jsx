import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './DashboardResponsiveChart.scss';

const DashboardResponsiveChart = ({ allCamps }) => {
  const maxPrice = Math.max(...allCamps.map((camp) => camp.price));

  return (
    <div className="chart__heading">
      <h2>Camps prices in 2023</h2>
      <ResponsiveContainer height={400} className="chart">
        <AreaChart
          data={allCamps}
          margin={{
            top: 0,
            right: 0,
            left: 40,
            bottom: 100,
          }}
        >
          <XAxis
            dataKey="name"
            interval={0}
            angle={-35}
            textAnchor="end"
            tickMargin={10}
          />
          <YAxis dataKey="price" domain={[0, maxPrice]} />

          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Area
            dataKey="price"
            type="monotone"
            stroke="#eab308"
            fill="#14b8a6"
            strokeWidth={2}
            name="Rating"
            unit=" $"
          />
        </AreaChart>
      </ResponsiveContainer>
      {/* <div>
        <ul>
          {allCamps.map((camp) => (
            <li>
              {camp.name}: {camp.price} per night
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};
export default DashboardResponsiveChart;
