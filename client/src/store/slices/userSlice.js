import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const defaultUsers = {
  mainUsers: [],
};

export const addUserAsyncAction = createAsyncThunk(
  "users/addUserAsyncAction",
  async (user) => {
    const response = await fetch("http://localhost:3201/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return getAllUsersFromserver();
  }
);

export const deleteUserAsyncAction =createAsyncThunk("users/deleteUserAsyncAction",async (user)=>{
  const response = await fetch("http://localhost:3201/users/"+user.id,{
    method:"DELETE"
  })
  return getAllUsersFromserver();
})

export const updateUserAsyncAction = createAsyncThunk("users/updateUserAsyncAction",async (user)=>{
  const response = await fetch("http://localhost:3201/users/"+user.id,{
    method:"PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
  return getAllUsersFromserver();
})
export const getUserDetailsAction = createAsyncThunk('users/getUserDetailsAction',()=>{
  return getAllUsersFromserver()
})
const getAllUsersFromserver = async () => {
  const userDetails = await (await fetch("http://localhost:3201/users")).json();
  return userDetails;
};
export const userSlice = createSlice({
  name: "users",
  initialState: defaultUsers,
  reducers: {
    addUser: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(addUserAsyncAction.fulfilled, (state, action) => {
      state.mainUsers = action.payload;
    });
    builder.addCase(getUserDetailsAction.fulfilled,(state,action)=>{
      state.mainUsers = action.payload
    });
    builder.addCase(deleteUserAsyncAction.fulfilled,(state,action)=>{
      state.mainUsers = action.payload
    });
    builder.addCase(updateUserAsyncAction.fulfilled,(state,action)=>{
      state.mainUsers = action.payload
    })

  },
});

export default userSlice.reducer;

export const { addUser } = userSlice.actions;
