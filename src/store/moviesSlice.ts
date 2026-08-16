import {createSlice} from "@reduxjs/toolkit";
import type {Genre, Movie} from "../api/types";

interface MoviesState {
    movies: Movie[];
    genres: Genre[];
    page: number;
    totalPages: number;
    selectedGenreId: number | null;
    query: string;
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
}

const initialState: MoviesState = {
    movies: [],
    genres: [],
    page: 1,
    totalPages: 0,
    selectedGenreId: null,
    query: "",
    status: "idle",
    error: null,
};

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
});
