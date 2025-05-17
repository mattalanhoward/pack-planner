// src/services/garageService.js
import api from './api';

const getItems = async () => {
  const response = await api.get('/garage');
  return response.data;
};

const addItem = async (itemData) => {
  const response = await api.post('/garage', itemData);
  return response.data;
};

const deleteItem = async (id) => {
  await api.delete(`/garage/${id}`);
};

export default {
  getItems,
  addItem,
  deleteItem,
};
