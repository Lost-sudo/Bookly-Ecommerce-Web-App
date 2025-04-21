import axios from "axios";

export const getUser = async (token) => {
  const response = await axios.get("http://localhost:8000/api/auth/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
