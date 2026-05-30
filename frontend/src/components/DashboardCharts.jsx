import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#36D399",
  "#3B82F6",
  "#FBBF24",
];

function DashboardCharts({ emissions }) {

  // Scope breakdown
  const scopeData = [

    {
      name: "Scope 1",
      value: emissions
        .filter(
          item =>
            item.scope === "scope_1"
        )
        .reduce(
          (sum, item) =>
            sum +
            Number(
              item.calculated_emissions
            ),
          0
        ),
    },

    {
      name: "Scope 2",
      value: emissions
        .filter(
          item =>
            item.scope === "scope_2"
        )
        .reduce(
          (sum, item) =>
            sum +
            Number(
              item.calculated_emissions
            ),
          0
        ),
    },

    {
      name: "Scope 3",
      value: emissions
        .filter(
          item =>
            item.scope === "scope_3"
        )
        .reduce(
          (sum, item) =>
            sum +
            Number(
              item.calculated_emissions
            ),
          0
        ),
    },

  ];

  // Monthly mock analytics
  const monthlyData = [

    {
      month: "Jan",
      emissions: 20,
    },

    {
      month: "Feb",
      emissions: 28,
    },

    {
      month: "Mar",
      emissions: 35,
    },

    {
      month: "Apr",
      emissions: 30,
    },

  ];

  return (

    <div className="charts-grid">

      {/* PIE CHART */}

      <div className="chart-card">

        <h2>
          Emission Breakdown
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={scopeData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
            >

              {scopeData.map(
                (entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* BAR CHART */}

      <div className="chart-card">

        <h2>
          Monthly Emissions
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={monthlyData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="emissions"
              fill="#2DD4BF"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DashboardCharts;