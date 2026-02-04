import axios from "axios";

const api = axios.create({
  baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/',
});


export const getCampers = async (filters = {}) => {
    const { data } = await api.get('/campers', {
    params: filters,
  });
  return data;
};


export const getCamperById = async (id: string) => {
  const { data } = await api.get(`/campers/${id}`);
  return data;
};

export default api;