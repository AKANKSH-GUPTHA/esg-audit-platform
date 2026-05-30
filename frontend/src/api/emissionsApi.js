const API_BASE =
  "https://esg-audit-platform.onrender.com/api/emissions";

export const fetchEmissions = async () => {

  const response = await fetch(API_BASE);

  return await response.json();
};

export const approveEmission = async (id) => {

  await fetch(`${API_BASE}/${id}/approve/`, {
    method: "PATCH",
  });
};

export const uploadCSV = async (formData) => {

  const response = await fetch(
    `${API_BASE}/upload/`,
    {
      method: "POST",
      body: formData,
    }
  );

  return await response.json();
};