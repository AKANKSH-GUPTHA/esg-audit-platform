function EmissionTable({
  emissions,
  reloadData,
}) {

  const approveEmission = async (id) => {

    try {

      await fetch(
        `https://esg-audit-platform.onrender.com/api/emissions/${id}/approve/`,
        {
          method: "PATCH",
        }
      );

      reloadData();

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <div className="table-section">

      <h2>Emission Records</h2>

      <table className="emission-table">

        <thead>

          <tr>

            <th>Activity</th>
            <th>Scope</th>
            <th>Emissions</th>
            <th>Status</th>
            <th>Anomaly</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {emissions.map((item) => (

            <tr key={item.id}>

              <td>
                {item.activity_type}
              </td>

              <td>
                {item.scope}
              </td>

              <td>
                {item.calculated_emissions}
              </td>

              <td>
                {item.analyst_status}
              </td>

              <td>
                {item.anomaly_flag
                  ? "⚠ Flagged"
                  : "No"}
              </td>

              <td>

                {item.analyst_status ===
                "flagged" ? (

                  <button
                    onClick={() =>
                      approveEmission(item.id)
                    }
                    style={{
                      background: "#22c55e",
                      border: "none",
                      padding: "8px 14px",
                      color: "white",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </button>

                ) : (

                  "Approved"

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default EmissionTable;