// src/components/Garage/GearItemList.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteGearItem } from '../../redux/slices/garageSlice';

const GearItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Delete this gear item?')) {
      dispatch(deleteGearItem(id));
    }
  };

  if (!items.length) {
    return <p className="text-center text-gray-500">No gear added yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={item._id}
          className="bg-white border rounded shadow p-4 flex justify-between items-start"
        >
          <div className="space-y-1">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-600">
              {item.brand} &middot; {item.itemType}
            </p>
            {item.category && (
              <p className="text-sm text-gray-500">Category: {item.category}</p>
            )}
            {item.weight != null && (
              <p className="text-sm text-gray-500">Weight: {item.weight} g</p>
            )}
          </div>
          <button
            onClick={() => handleDelete(item._id)}
            className="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default GearItemList;
