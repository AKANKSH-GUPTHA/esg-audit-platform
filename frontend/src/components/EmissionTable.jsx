async function approveEmission(id, reloadData) {

  try {

    const response = await fetch(
      `https://esg-audit-platform.onrender.com/api/emissions/${id}/approve/`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) {

      throw new Error("Approval failed");
    }

    alert("Emission approved");

    await reloadData();

    window.location.reload();

  } catch (error) {

    console.error(error);

    alert("Approval failed");
  }
}

function EmissionTable({ emissions, reloadData }) {

  return (

    <div
      style={{
        background: "#16213E",
        padding: "24px",
        borderRadius: "20px",
        marginBottom: "30px",
      }}
    >

      <h2
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        Emission Records
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "white",
        }}
      >

        <thead>

          <tr
            style={{
              background: "#33415C",
            }}
          >

            <th style={styles.th}>Activity</th>
            <th style={styles.th}>Scope</th>
            <th style={styles.th}>Emissions</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Anomaly</th>
            <th style={styles.th}>Action</th>

          </tr>

        </thead>

        <tbody>

          {emissions.map((item) => (

            <tr key={item.id}>

              <td style={styles.td}>
                {item.activity_type}
              </td>

              <td style={styles.td}>
                {item.scope}
              </td>

              <td style={styles.td}>
                {item.calculated_emissions}
              </td>

              <td style={styles.td}>
                {item.analyst_status}
              </td>

              <td style={styles.td}>

                {item.anomaly_flag
                  ? "⚠ Flagged"
                  : "No"}

              </td>

              <td style={styles.td}>

                {item.analyst_status === "flagged" ? (

                  <button
                    onClick={() =>
                      approveEmission(
                        item.id,
                        reloadData
                      )
                    }
                    style={{
                      background: "#22C55E",
                      color: "white",
                      border: "none",
                      padding: "10px 18px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
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

const styles = {

  th: {
    padding: "14px",
    textAlign: "left",
  },

  td: {
    padding: "16px",
    borderBottom: "1px solid #22304A",
  },
};

export default EmissionTable;