import axios from "axios";

const API = "http://127.0.0.1:8000/api/emissions/";

export const fetchEmissions = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const approveEmission = async (id) => {
  const response = await axios.patch(`${API}${id}/`, {
    analyst_status: "approved",
  });

  return response.data;
};