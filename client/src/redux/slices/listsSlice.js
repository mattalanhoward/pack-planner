// src/redux/slices/listsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import listsService from '../../services/listsService';

// Thunks
export const fetchLists = createAsyncThunk(
  'lists/fetchLists',
  async (_, thunkAPI) => {
    try {
      return await listsService.getLists();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchListById = createAsyncThunk(
  'lists/fetchListById',
  async (id, thunkAPI) => {
    try {
      return await listsService.getListById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createList = createAsyncThunk(
  'lists/createList',
  async ({ title }, thunkAPI) => {
    try {
      return await listsService.createList({ title });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteList = createAsyncThunk(
  'lists/deleteList',
  async (id, thunkAPI) => {
    try {
      await listsService.deleteList(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const copyGarageItem = createAsyncThunk(
  'lists/copyGarageItem',
  async ({ boardId, destColId, item, destIdx }, thunkAPI) => {
    try {
      return await listsService.copyGarageItem({
        boardId,
        columnId: destColId,
        item,
        destIdx,
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateListColumns = createAsyncThunk(
  'lists/updateListColumns',
  async ({ boardId, columns }, thunkAPI) => {
    try {
      return await listsService.updateListColumns({ boardId, columns });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createColumn = createAsyncThunk(
  'lists/createColumn',
  async ({ boardId, title }, thunkAPI) => {
    try {
      return await listsService.createColumn({ boardId, title });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateColumnTitle = createAsyncThunk(
  'lists/updateColumnTitle',
  async ({ boardId, columnId, title }, thunkAPI) => {
    try {
      return await listsService.updateColumnTitle({ boardId, columnId, title });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'lists/deleteColumn',
  async ({ boardId, columnId }, thunkAPI) => {
    try {
      return await listsService.deleteColumn({ boardId, columnId });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateListItem = createAsyncThunk(
  'lists/updateListItem',
  async ({ boardId, columnId, itemId, updates }, thunkAPI) => {
    try {
      return await listsService.updateListItem({ boardId, columnId, itemId, updates });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const removeListItem = createAsyncThunk(
  'lists/removeListItem',
  async ({ boardId, columnId, itemId }, thunkAPI) => {
    try {
      return await listsService.removeListItem({ boardId, columnId, itemId });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {
    moveItem: (state, action) => {
      const { boardId, sourceColId, destColId, sourceIdx, destIdx } = action.payload;
      const board = state.boards.find((b) => b._id === boardId);
      if (!board) return;
      const sourceCol = board.columns.find((c) => c._id === sourceColId);
      const destCol = board.columns.find((c) => c._id === destColId);
      const [moved] = sourceCol.items.splice(sourceIdx, 1);
      if (sourceColId === destColId) {
        sourceCol.items.splice(destIdx, 0, moved);
      } else {
        destCol.items.splice(destIdx, 0, moved);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Lists
      .addCase(fetchLists.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, { payload }) => {
        state.loading = false; state.boards = payload;
      })
      .addCase(fetchLists.rejected, (state, { payload }) => {
        state.loading = false; state.error = payload;
        toast.error(`Loading lists failed: ${payload}`);
      })

      // Fetch Single List
      .addCase(fetchListById.fulfilled, (state, { payload }) => {
        const idx = state.boards.findIndex((b) => b._id === payload._id);
        if (idx > -1) state.boards[idx] = payload;
        else state.boards.push(payload);
      })
      .addCase(fetchListById.rejected, (_, { payload }) => {
        toast.error(`Loading list failed: ${payload}`);
      })

      // Create List
      .addCase(createList.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(createList.fulfilled, (state, { payload }) => {
        state.loading = false; state.boards.push(payload);
        toast.success(`List "${payload.title}" created!`);
      })
      .addCase(createList.rejected, (state, { payload }) => {
        state.loading = false; state.error = payload;
        toast.error(`Create list failed: ${payload}`);
      })

      // Delete List
      .addCase(deleteList.fulfilled, (state, { payload }) => {
        state.boards = state.boards.filter((b) => b._id !== payload);
        toast.success('List deleted');
      })
      .addCase(deleteList.rejected, (state, { payload }) => {
        state.error = payload;
        toast.error(`Delete list failed: ${payload}`);
      })

      // Copy Garage Item
      .addCase(copyGarageItem.fulfilled, (state, { payload }) => {
        const idx = state.boards.findIndex((b) => b._id === payload._id);
        if (idx > -1) state.boards[idx] = payload;
        toast.success('Item added to list');
      })
      .addCase(copyGarageItem.rejected, (_, { payload }) => {
        toast.error(`Add item failed: ${payload}`);
      })

      // Update List Columns (persist reorder)
      .addCase(updateListColumns.fulfilled, (state, { payload }) => {
        const idx = state.boards.findIndex((b) => b._id === payload._id);
        if (idx > -1) state.boards[idx] = payload;
        toast.success('List order saved');
      })
      .addCase(updateListColumns.rejected, (_, { payload }) => {
        toast.error(`Save order failed: ${payload}`);
      })

      // Create Column
      .addCase(createColumn.fulfilled, (state, { payload, meta }) => {
        const idx = state.boards.findIndex((b) => b._id === payload._id);
        if (idx > -1) state.boards[idx] = payload;
        toast.success(`Column "${meta.arg.title}" added!`);
      })
      .addCase(createColumn.rejected, (_, { payload }) => {
        toast.error(`Add column failed: ${payload}`);
      })

      // Update Column Title
      .addCase(updateColumnTitle.fulfilled, (state, { payload, meta }) => {
        const idx = state.boards.findIndex((b) => b._id === payload._id);
        if (idx > -1) state.boards[idx] = payload;
        toast.success(`Column renamed to "${meta.arg.title}"`);
      })
      .addCase(updateColumnTitle.rejected, (_, { payload }) => {
        toast.error(`Rename column failed: ${payload}`);
      })

      // Delete Column
      .addCase(deleteColumn.fulfilled, (state, { payload }) => {
        const idx = state.boards.findIndex((b) => b._id === payload._id);
        if (idx > -1) state.boards[idx] = payload;
        toast.success('Column deleted');
      })
      .addCase(deleteColumn.rejected, (_, { payload }) => {
        toast.error(`Delete column failed: ${payload}`);
      })

      // Update List Item
      .addCase(updateListItem.fulfilled, (state, { payload }) => {
        const idx = state.boards.findIndex((b) => b._id === payload._id);
        if (idx > -1) state.boards[idx] = payload;
        toast.success('Item updated');
      })
      .addCase(updateListItem.rejected, (_, { payload }) => {
        toast.error(`Update item failed: ${payload}`);
      })

      // Remove List Item
      .addCase(removeListItem.fulfilled, (state, { payload }) => {
        const idx = state.boards.findIndex((b) => b._id === payload._id);
        if (idx > -1) state.boards[idx] = payload;
        toast.success('Item removed');
      })
      .addCase(removeListItem.rejected, (_, { payload }) => {
        toast.error(`Remove item failed: ${payload}`);
      });
  },
});

export const { moveItem } = listsSlice.actions;
export default listsSlice.reducer;
