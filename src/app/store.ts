import { configureStore } from "@reduxjs/toolkit";
import { listSlice } from "../containers/List/listSlice";


export const store = configureStore({
    reducer: {
        tasks: listSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;