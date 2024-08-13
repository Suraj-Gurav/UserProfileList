import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data.map((item)=>{ return {...item,isLiked:false}})
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: false,
    error: null,
  },
  reducers: {
    editUser: (state, action) => {
      const { id, changes } = action.payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) {
        Object.assign(existingUser, changes);
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
    likeClicked: (state, action) => {
      const { userId } = action.payload;
      state.users = state.users.map((user) => user.id === userId ? { ...user, isLiked: !user.isLiked } : user )      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = false;
        state.users = action.payload;        
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
        console.log("API Error",action.error)
      });
  },
})

export const { editUser, deleteUser, likeClicked} = usersSlice.actions;

export default usersSlice.reducer;
