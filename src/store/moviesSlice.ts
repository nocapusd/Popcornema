import {createSlice} from "@reduxjs/toolkit";
import type {IGenre, IMovie} from "../api/types";

type MoviesStateType = {
    movies: IMovie[];
    genres: IGenre[];
    page: number;
    totalPages: number;
    selectedGenreId: number | null;
    query: string;
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
}

const initialState: MoviesStateType = {
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
    name: "moviesSlice",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
});
