import { useState } from "react";

function UploadPanel({ reloadData }) {

  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    if (!file) {

      alert("Please select CSV file");

      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      const response = await fetch(
        "https://esg-audit-platform.onrender.com/api/ingestion/upload/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log(data);

      alert("CSV uploaded successfully");

      // IMPORTANT
      reloadData();

    } catch (error) {

      console.error(error);

      alert("Upload failed");
    }
  };

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
        Upload ESG Data
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
        style={{
          marginBottom: "20px",
          color: "white",
        }}
      />

      <br />

      <button
        onClick={handleUpload}
        style={{
          background: "#00C896",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Upload CSV
      </button>

    </div>
  );
}

export default UploadPanel;