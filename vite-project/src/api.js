import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/auth', // URL de tu servidor de autenticación
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProductsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

export default apiClient;
