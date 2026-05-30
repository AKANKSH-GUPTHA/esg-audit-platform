import { approveEmission } from "../api/emissionsApi";

function EmissionTable({ emissions, reloadData }) {

  const handleApprove = async (id) => {
    try {
      await approveEmission(id);

      reloadData();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="table-card">

      <h2 className="section-title">
        Emission Records
      </h2>

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

              <td>{item.activity_type}</td>

              <td>{item.scope}</td>

              <td>{item.calculated_emissions}</td>

              <td>
                {item.analyst_status}
              </td>

              <td>
                {item.anomaly_flag ? "⚠ Flagged" : "No"}
              </td>

              <td>

                {item.analyst_status !== "approved" && (

                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(item.id)}
                  >
                    Approve
                  </button>

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