// src/pages/GearListPage.jsx
import React, { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchLists,
  moveItem,
  copyGarageItem,
  updateListColumns,
  createColumn
} from '../redux/slices/listsSlice';
import ListColumn from '../components/GearLists/ListColumn';
import DraggableItemCard from '../components/GearLists/DraggableItemCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const GearListPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Get lists state and garage items
  const { boards, loading, error } = useSelector((state) => state.lists);
  const garageItems = useSelector((state) => state.garage.items);

  // Find current board
  const list = boards.find((b) => b._id === id);

  // Local UI state
  const [showGarage, setShowGarage] = useState(false);
  const [search, setSearch] = useState('');
  const [newColTitle, setNewColTitle] = useState('');

// Debounced search term (300ms)
  const debouncedSearch = useDebounce(search, 300);

  // Load board on mount or when no list
  useEffect(() => {
    if (!list) dispatch(fetchLists());
  }, [dispatch, list]);

  // Handle drag & drop
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // If dragging from garage modal
    if (draggableId.startsWith('garage-')) {
      const gearId = draggableId.replace('garage-', '');
      const item = garageItems.find((i) => i._id === gearId);
      if (item) {
        dispatch(
          copyGarageItem({
            boardId: id,
            destColId: destination.droppableId,
            item,
            destIdx: destination.index,
          })
        );
        // Persist new order/structure
        const updated = list.columns.map((c) => ({
          ...c,
          items: [...c.items],
        }));
        dispatch(updateListColumns({ boardId: id, columns: updated }));
      }
      setShowGarage(false);
      return;
    }

    // Normal column-to-column move
    dispatch(
      moveItem({
        boardId: id,
        sourceColId: source.droppableId,
        destColId: destination.droppableId,
        sourceIdx: source.index,
        destIdx: destination.index,
      })
    );
    // Persist reorder
    const updated = list.columns.map((c) => ({
      ...c,
      items: [...c.items],
    }));
    dispatch(updateListColumns({ boardId: id, columns: updated }));
  };

  // Add new column
  const handleAddColumn = (e) => {
    e.preventDefault();
    if (!newColTitle.trim()) return;
    dispatch(createColumn({ boardId: id, title: newColTitle }))
      .then((res) => {
        if (!res.error) setNewColTitle('');
      });
  };

  // Loading / error / not found states
  if (loading) return <p>Loading board…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!list) return <p>Board not found</p>;

  // Filter garage items by search
  const filteredGarage = garageItems.filter((item) => {
    const term = debouncedSearch.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.brand?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
      {/* Header & Add-from-Garage */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{list.title}</h2>
        <button
          onClick={() => setShowGarage(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add from Garage
        </button>
      </div>

      {/* New Column Form */}
      <form onSubmit={handleAddColumn} className="mb-4 flex space-x-2">
        <input
          value={newColTitle}
          onChange={(e) => setNewColTitle(e.target.value)}
          placeholder="New column title"
          className="flex-1 p-2 border rounded"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Adding…' : '+ Add Column'}
        </button>
      </form>

      {/* Garage Modal */}
      {showGarage && (
        <div className="fixed inset-0 z-50 bg-white p-4 overflow-y-auto flex flex-col animate-slide-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">My Gear</h3>
            <button
              onClick={() => setShowGarage(false)}
              className="text-sm text-gray-500 underline"
            >
              Close
            </button>
          </div>
          <input
            type="text"
            placeholder="Search gear…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <Droppable droppableId="garage" isDropDisabled>
            {(provided) => (
              <div
                className="flex flex-col gap-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {filteredGarage.map((item, idx) => (
                  <Draggable
                    key={item._id}
                    draggableId={`garage-${item._id}`}
                    index={idx}
                  >
                    {(prov) => (
                      <div
                        className="border p-2 rounded shadow-sm bg-gray-50"
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                      >
                        <p className="font-medium">{item.name}</p>
                        <small className="text-gray-500">{item.brand}</small>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}

      {/* Gear List Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {list.columns.map((column) => (
            <ListColumn key={column._id} boardId={id} column={column}>
              {column.items.map((item, idx) => (
                <DraggableItemCard
                  key={item._id}
                  boardId={id}
                  columnId={column._id}
                  item={item}
                  index={idx}
                />
              ))}
            </ListColumn>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default GearListPage;
