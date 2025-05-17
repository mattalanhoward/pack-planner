// src/services/listsService.js
import api from './api';

const getLists = async () => {
  const response = await api.get('/lists');
  return response.data;
};

const getListById = async (id) => {
  const response = await api.get(`/lists/${id}`);
  return response.data;
};

const createList = async ({ title }) => {
  const response = await api.post('/lists', { title });
  return response.data;
};

const deleteList = async (id) => {
  await api.delete(`/lists/${id}`);
  return id;
};

const updateListColumns = async ({ boardId, columns }) => {
  const response = await api.put(`/lists/${boardId}`, { columns });
  return response.data;
};

const copyGarageItem = async ({ boardId, columnId, item, destIdx }) => {
  const response = await api.post(
    `/lists/${boardId}/columns/${columnId}/items`,
    { ...item, position: destIdx }
  );
  return response.data;
};

const createColumn = async ({ boardId, title }) => {
  const response = await api.post(`/lists/${boardId}/columns`, { title });
  return response.data;
};

const updateColumnTitle = async ({ boardId, columnId, title }) => {
  const response = await api.put(
    `/lists/${boardId}/columns/${columnId}`,
    { title }
  );
  return response.data;
};

const deleteColumn = async ({ boardId, columnId }) => {
  const response = await api.delete(
    `/lists/${boardId}/columns/${columnId}`
  );
  return response.data;
};

// Update an item already in a list column
const updateListItem = async ({ boardId, columnId, itemId, updates }) => {
  const response = await api.put(
    `/lists/${boardId}/columns/${columnId}/items/${itemId}`,
    updates
  );
  return response.data;
};

// Remove/delete an item from a list column (but not from garage)
const removeListItem = async ({ boardId, columnId, itemId }) => {
  // backend deletes the item from that list
  const response = await api.delete(
    `/lists/${boardId}/columns/${columnId}/items/${itemId}`
  );
  return response.data;
};

const listsService = {
  getLists,
  getListById,
  createList,
  deleteList,
  updateListColumns,
  copyGarageItem,
  createColumn,
  updateColumnTitle,
  deleteColumn,
  updateListItem, 
  removeListItem,
};

export default listsService;
