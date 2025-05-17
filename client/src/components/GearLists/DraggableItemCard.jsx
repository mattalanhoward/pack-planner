// src/components/GearLists/DraggableItemCard.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateListItem,
  removeListItem
} from '../../redux/slices/listsSlice';
import { Draggable } from 'react-beautiful-dnd';

const DraggableItemCard = ({ boardId, columnId, item, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: item.name,
    quantity: item.quantity || 1,
    description: item.description || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const saveChanges = () => {
    dispatch(updateListItem({
      boardId,
      columnId,
      itemId: item._id,
      updates: {
        name: form.name,
        quantity: Number(form.quantity),
        description: form.description
      }
    }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Remove this item from list?')) {
      dispatch(removeListItem({ boardId, columnId, itemId: item._id }));
    }
  };

  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2 p-2 bg-white rounded shadow"
        >
          {isEditing ? (
            <div className="space-y-2">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-1 rounded"
              />
              <input
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                className="w-20 border p-1 rounded"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={2}
                className="w-full border p-1 rounded"
              />
              <div className="flex space-x-2">
                <button
                  onClick={saveChanges}
                  className="px-2 py-1 bg-green-600 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-2 py-1 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{item.name}</p>
                {item.quantity != null && (
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                )}
                {item.description && (
                  <p className="text-sm text-gray-500">{item.description}</p>
                )}
              </div>
              <div className="flex flex-col items-end space-y-1">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItemCard;
