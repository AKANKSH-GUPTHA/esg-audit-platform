import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import StatsCard from "./components/StatsCard";
import EmissionTable from "./components/EmissionTable";
import DashboardCharts from "./components/DashboardCharts";
import UploadPanel from "./components/UploadPanel";
import AuditTimeline from "./components/AuditTimeline";

import { fetchEmissions } from "./api/emissionsApi";

import "./styles/dashboard.css";

function App() {

  const [emissions, setEmissions] = useState([]);

  const loadData = async () => {

    try {

      const data = await fetchEmissions();

      console.log("Fetched:", data);

      setEmissions(data);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    loadData();

  }, []);

  const totalEmissions =
    emissions.reduce(
      (sum, item) =>
        sum + Number(item.calculated_emissions || 0),
      0
    );

  const anomalies =
    emissions.filter(
      (item) => item.anomaly_flag
    ).length;

  return (

    <div className="app-layout">

      <Sidebar />

      <main className="dashboard-container">

        <h1 className="dashboard-title">
          ESG Audit Intelligence Platform
        </h1>

        <div className="stats-grid">

          <StatsCard
            title="Total Emissions"
            value={`${totalEmissions} MT`}
          />

          <StatsCard
            title="Records"
            value={emissions.length}
          />

          <StatsCard
            title="Anomalies"
            value={anomalies}
          />

          <StatsCard
            title="Pending Reviews"
            value={anomalies}
          />

        </div>

        <DashboardCharts emissions={emissions} />

        <UploadPanel reloadData={loadData} />

        <EmissionTable
          emissions={emissions}
          reloadData={loadData}
        />

        <AuditTimeline />

      </main>

    </div>
  );
}

export default App;