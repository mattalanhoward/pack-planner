// src/pages/ListsDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists, createList, deleteList } from '../redux/slices/listsSlice';
import { useNavigate } from 'react-router-dom';

const ListsDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boards, loading, error } = useSelector((state) => state.lists);
  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(createList({ title })).then((res) => {
      if (!res.error) {
        setTitle('');
        navigate(`/lists/${res.payload._id}`);
      }
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this list?')) {
      dispatch(deleteList(id));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Gear Lists</h2>

      <form onSubmit={handleCreate} className="flex mb-6">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="New list title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>

      {loading && <p>Loading lists…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && boards.length === 0 && <p>No lists yet.</p>}

      <ul className="space-y-2">
        {boards.map((board) => (
          <li
            key={board._id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded"
          >
            <span
              onClick={() => navigate(`/lists/${board._id}`)}
              className="flex-1 cursor-pointer text-blue-600 hover:underline"
            >
              {board.title}
            </span>
            <button
              onClick={() => handleDelete(board._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListsDashboard;
