import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchTasks } from "./listThunks"

interface Task {
    status: boolean,
    task: string
}

interface ListState {
    tasks: Task[]
}

const initialState: ListState = {
    tasks: []
}

export const listSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            const data = action.payload;
            state.tasks = [...state.tasks, ...Object.values(data)];
        })
    }
})
