import axios from "axios";

export const getUser = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/profile/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
