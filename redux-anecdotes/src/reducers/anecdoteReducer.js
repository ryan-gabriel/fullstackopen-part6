import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import anecdotes from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAnecdotes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(initializeAnecdotes.pending, () => {
        console.log('Loading anecdotes...');
      })
      .addCase(initializeAnecdotes.rejected, (state, action) => {
        console.error('Failed to fetch anecdotes', action.error);
      });
  },
});

export const { voteAnecdote, createAnecdote, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = createAsyncThunk(
  "anecdotes/initializeAnecdotes",
  async () => {
    const anecdotesData = await anecdotes.getAll();
    return anecdotesData;
  }
);

export default anecdoteSlice.reducer;
