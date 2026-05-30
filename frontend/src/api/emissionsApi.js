const API_BASE_URL =
  "https://esg-audit-platform.onrender.com";

export const fetchEmissions = async () => {

  const response = await fetch(
    `${API_BASE_URL}/api/emissions/`
  );

  return response.json();
};

export const approveEmission = async (id) => {

  const response = await fetch(
    `${API_BASE_URL}/api/emissions/${id}/approve/`,
    {
      method: "PATCH",
    }
  );

  return response.json();
};