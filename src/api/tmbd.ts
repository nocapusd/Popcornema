import axios, {type AxiosError} from 'axios'
import type {Genre, GenresResponse, Movie, TmdbListResponse} from "./types.ts";

export const tmdbClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`
    }
})

tmdbClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            return Promise.reject(new Error('Unauthorized: Invalid API token'))
        }
        if (!error.response) {
            return Promise.reject(new Error('Network error: No response received'))
        }

        return Promise.reject(new Error(`HTTP error: ${error.response.status} ${error.response.statusText}`))
    }
)

export const getGenres = async (): Promise<Genre[]> => {
    const response = await tmdbClient.get<GenresResponse>('/genre/movie/list')
    return response.data.genres
}

export const getMovies = async (page: number = 1, genreId: number | null = null): Promise<TmdbListResponse<Movie>> => {
    const response = await tmdbClient.get<TmdbListResponse<Movie>>('/discover/movie', {
        params: {
            page,
            ...(genreId ? {with_genres: genreId} : {})
        }
    })

    return response.data
}

export const searchMovies = async (query: string, page: number = 1): Promise<TmdbListResponse<Movie>> => {
    const response = await tmdbClient.get<TmdbListResponse<Movie>>('/search/movie', {
        params: {
            query,
            page
        }
    })

    return response.data
}
