import "./AuditTimeline.css";

function AuditTimeline() {

  const auditEvents = [

    {
      id: 1,
      action: "Emission Record Uploaded",
      user: "Analyst",
      time: "10 mins ago",
    },

    {
      id: 2,
      action: "AI flagged anomaly in Scope 1",
      user: "AI Engine",
      time: "8 mins ago",
    },

    {
      id: 3,
      action: "Emission approved by auditor",
      user: "Auditor",
      time: "5 mins ago",
    },

  ];

  return (

    <div className="timeline-card">

      <h2 className="timeline-title">
        Audit Timeline
      </h2>

      <div className="timeline-list">

        {auditEvents.map((event) => (

          <div
            key={event.id}
            className="timeline-item"
          >

            <div className="timeline-dot"></div>

            <div>

              <h4>{event.action}</h4>

              <p>
                {event.user} • {event.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AuditTimeline;