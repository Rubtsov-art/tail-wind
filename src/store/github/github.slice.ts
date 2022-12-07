import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_FAVORITE_KEY = 'fk'

interface GithubState {
    favorites: string[];
}

const initialState: GithubState = {
    favorites: JSON.parse(localStorage.getItem(LS_FAVORITE_KEY) as string) ?? []
}

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<string>) {
            state.favorites.push(action.payload)
            localStorage.setItem(LS_FAVORITE_KEY, JSON.stringify(state.favorites))
        },
        removeFavorite(state, action: PayloadAction<string>) {
            state.favorites = state.favorites.filter((f) => f !== action.payload)
            localStorage.setItem(LS_FAVORITE_KEY, JSON.stringify(state.favorites))
        },
    }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer