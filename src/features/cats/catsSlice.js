import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action Creators

// async actions
export const fetchCats = createAsyncThunk("cats/fetchCats", () => {
  // return a Promise containing the data we want
  return fetch("https://learn-co-curriculum.github.io/cat-api/cats.json")
    .then((response) => response.json())
    .then((data) => data.images);
});


// Reducer

const catsSlice = createSlice({
  name: "cats",
  initialState: {
    entities: [], // array of cats
    status: "idle", // loading state
  },
  reducers: {
    catAdded(state, action) {
      // using createSlice lets us mutate state!
      state.entities.push(action.payload);
    },
    catUpdated(state, action) {
      const cat = state.entities.find((cat) => cat.id === action.payload.id);
      cat.url = action.payload.url;
    },
    // async actions to come...
    extraReducers: {
      // handle async action types
      [fetchCats.pending](state) {
        state.status = "loading";
      },
      [fetchCats.fulfilled](state, action) {
        state.entities = action.payload;
        state.status = "idle";
      },
    },
  },
});

// sync actions added for demo purposes
export const { catAdded, catUpdated } = catsSlice.actions;

export default catsSlice.reducer;