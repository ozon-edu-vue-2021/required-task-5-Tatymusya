import apiClient from '@/api/apiClient.js';

const END_POINT = '/products';

const getProducts = () => apiClient.get(END_POINT);
const getProductById = (id) => apiClient.get(`${END_POINT}/${id}`);

export {
    getProducts,
    getProductById
};