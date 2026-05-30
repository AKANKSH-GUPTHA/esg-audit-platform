import { useEffect, useState } from "react";

import {
    fetchAnalytics,
    fetchEmissionRecords,
} from "../api/dashboardApi";

import "../styles/dashboard.css";


function Dashboard() {

    const [analytics, setAnalytics] = useState(null);

    const [records, setRecords] = useState([]);


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            const analyticsData =
                await fetchAnalytics();

            const emissionData =
                await fetchEmissionRecords();

            setAnalytics(analyticsData);

            setRecords(emissionData);

        } catch (error) {

            console.error(
                "Dashboard loading failed",
                error
            );
        }
    };


    if (!analytics) {
        return <h1>Loading Dashboard...</h1>;
    }


    return (
        <div className="dashboard-container">

            <h1 className="dashboard-title">
                ESG Audit Intelligence Platform
            </h1>

            <div className="kpi-grid">

                <div className="kpi-card">
                    <h3>Total Emissions</h3>
                    <p>
                        {analytics.total_emissions}
                    </p>
                </div>

                <div className="kpi-card">
                    <h3>Scope 1</h3>
                    <p>
                        {analytics.scope_1_total}
                    </p>
                </div>

                <div className="kpi-card">
                    <h3>Anomalies</h3>
                    <p>
                        {analytics.anomaly_count}
                    </p>
                </div>

                <div className="kpi-card">
                    <h3>Pending Reviews</h3>
                    <p>
                        {analytics.pending_review_count}
                    </p>
                </div>

            </div>


            <div className="table-container">

                <h2>
                    Emission Records
                </h2>

                <table>

                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Scope</th>
                            <th>Emissions</th>
                            <th>Status</th>
                            <th>Anomaly</th>
                        </tr>
                    </thead>

                    <tbody>

                        {records.map((record) => (

                            <tr key={record.id}>

                                <td>
                                    {record.activity_type}
                                </td>

                                <td>
                                    {record.scope}
                                </td>

                                <td>
                                    {record.calculated_emissions}
                                </td>

                                <td>
                                    {record.analyst_status}
                                </td>

                                <td>
                                    {record.anomaly_flag
                                        ? "⚠️ Yes"
                                        : "No"}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}


export default Dashboard;