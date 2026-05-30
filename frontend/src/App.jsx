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

  // Fetch emissions data
  const loadData = async () => {

    try {

      const data = await fetchEmissions();

      setEmissions(data);

    } catch (error) {

      console.error("API Error:", error);

    }
  };

  // Load on first render
  useEffect(() => {

    loadData();

  }, []);

  // Dynamic calculations
  const totalEmissions = emissions
    .reduce(
      (sum, item) =>
        sum +
        Number(item.calculated_emissions || 0),
      0
    )
    .toFixed(2);

  const scope1Emissions = emissions
    .filter(
      item => item.scope === "scope_1"
    )
    .reduce(
      (sum, item) =>
        sum +
        Number(item.calculated_emissions || 0),
      0
    )
    .toFixed(2);

  const anomalyCount = emissions.filter(
    item => item.anomaly_flag
  ).length;

  const pendingReviews = emissions.filter(
    item =>
      item.analyst_status ===
      "pending_review"
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
            title="Scope 1"
            value={`${scope1Emissions} MT`}
          />

          <StatsCard
            title="Anomalies"
            value={anomalyCount}
          />

          <StatsCard
            title="Pending Reviews"
            value={pendingReviews}
          />

        </div>

        <DashboardCharts
  emissions={emissions}
/>

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