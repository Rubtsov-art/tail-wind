import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./github.api";

const store = configureStore({
    reducer: {
        [githubApi.reducerPath]: githubApi.reducer
    }
})

export default store