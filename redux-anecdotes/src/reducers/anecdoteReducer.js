import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAnecdotes.fulfilled, (state, action) => {
        console.log('Anecdotes initialized successfully:');
        return action.payload;
      })
      .addCase(initializeAnecdotes.pending, () => {
        console.log('Loading anecdotes...');
      })
      .addCase(initializeAnecdotes.rejected, (state, action) => {
        console.error('Failed to fetch anecdotes', action.error);
      });

    builder
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.push(action.payload);
        console.log('Anecdote created successfully');
      })
      .addCase(createAnecdote.pending, () => {
        console.log('Creating anecdote...');
      })
      .addCase(createAnecdote.rejected, (state, action) => {
        console.error('Failed to create anecdote', action.error);
      });
  },
});

export const { voteAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = createAsyncThunk(
  "anecdotes/initializeAnecdotes",
  async () => {
    const anecdotesData = await anecdoteService.getAll();
    return anecdotesData;
  }
);

export const createAnecdote = createAsyncThunk(
  "anecdotes/createAnecdote",
  async (content) => {
    const newAnecdote = await anecdoteService.createNew(content);
    return newAnecdote;
  }
);

export default anecdoteSlice.reducer;
