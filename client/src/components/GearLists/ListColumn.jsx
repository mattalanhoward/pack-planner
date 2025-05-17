// src/components/GearLists/ListColumn.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateColumnTitle,
  deleteColumn,
} from '../../redux/slices/listsSlice';
import { Droppable } from 'react-beautiful-dnd';

const ListColumn = ({ boardId, column, children }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(column.title);

  const handleRename = () => {
    if (newTitle.trim() && newTitle !== column.title) {
      dispatch(updateColumnTitle({ boardId, columnId: column._id, title: newTitle }));
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (column.items.length === 0) {
      if (window.confirm('Delete this empty column?')) {
        dispatch(deleteColumn({ boardId, columnId: column._id }));
      }
    } else {
      alert('Only empty columns can be deleted.');
    }
  };

  return (
    <Droppable droppableId={column._id} key={column._id}>
      {(provided) => (
        <div
          className="bg-gray-100 p-4 rounded shadow"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="flex items-center justify-between mb-2">
            {isEditing ? (
              <input
                className="border p-1 flex-1"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                autoFocus
              />
            ) : (
              <h3
                className="text-lg font-bold flex-1 cursor-pointer"
                onDoubleClick={() => setIsEditing(true)}
              >
                {column.title}
              </h3>
            )}
            <button
              onClick={handleDelete}
              className="text-red-600 ml-2 hover:text-red-800"
              title="Delete column"
            >
              &#x2715;
            </button>
          </div>

          {/* Render items */}
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ListColumn;
