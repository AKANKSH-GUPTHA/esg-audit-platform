import { useState } from "react";

function UploadPanel() {

  const [file, setFile] = useState(null);

  const [message, setMessage] = useState("");

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/ingestion/upload/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setMessage(data.message);

    } catch (error) {

      console.error(error);

      setMessage("Upload failed");

    }
  };

  return (

    <div className="upload-panel">

      <h2 className="table-title">
        Upload ESG Data
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button
        className="upload-btn"
        onClick={handleUpload}
      >
        Upload CSV
      </button>

      {message && (
        <p className="upload-message">
          {message}
        </p>
      )}

    </div>
  );
}

export default UploadPanel;