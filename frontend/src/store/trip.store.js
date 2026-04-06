import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTrip,
  getTripsByUser,
  getTripById,
  updateTrip,
  deleteTrip,
} from "../api/trip";
export const initialState = {
  trips: [],
  searchQuery: "",
  selectedPrice: null,
  selectedSortValue: "none",
};

export const fetchAllTripsAsync = createAsyncThunk(
  "/trips/my-trips",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTripsByUser();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const createTripAsync = createAsyncThunk(
  "/trips/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createTrip(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateTripAsync = createAsyncThunk(
  "trips/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateTrip(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTripAsync = createAsyncThunk(
  "trips/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteTrip(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getTripByIdAsync = createAsyncThunk(
  "trips/:id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getTripById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
const formSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    addtrip: (state, action) => {
      state.trips.push({
        id: Date.now(),
        ...action.payload,
      });
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    setSelectedPrice: (state, action) => {
      state.selectedPrice = action.payload;
    },

    setSelectedSortValue: (state, action) => {
      state.selectedSortValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //--FETCH ALL TRIPS--//
      .addCase(fetchAllTripsAsync.pending, (state) => {
        ((state.loading = true), (state.error = false));
      })
      .addCase(fetchAllTripsAsync.fulfilled, (state, action) => {
        ((state.loading = false), (state.trips = action.payload.data || []));
      })
      .addCase(fetchAllTripsAsync.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      //--CREATE TRIPS--//
      .addCase(createTripAsync.pending, (state) => {
        ((state.loading = true), (state.error = false));
      })
      .addCase(createTripAsync.fulfilled, (state, action) => {
        ((state.loading = false), state.trips.push(action.payload.data));
      })
      .addCase(createTripAsync.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      //-- UPDATE TRIPS --/
      .addCase(updateTripAsync.pending, (state) => {
        ((state.loading = true), (state.error = false));
      })
      .addCase(updateTripAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.trips.findIndex(
          (trip) => trip._id === action.payload._id,
        );
        if (index !== -1) {
          state.trips[index] = action.payload;
        }
      })
      .addCase(updateTripAsync.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      //-- DELETE TRIP --//
      .addCase(deleteTripAsync.pending, (state) => {
        ((state.loading = true), (state.error = false));
      })
      .addCase(deleteTripAsync.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.trips = state.trips.filter(
            (trip) => trip._id !== action.payload,
          )));
      })
      .addCase(deleteTripAsync.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      });
  },
});
export const { setSearchQuery, setSelectedPrice, setSelectedSortValue } =
  formSlice.actions;
export default formSlice.reducer;
