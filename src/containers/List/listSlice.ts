import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { deleteTask, fetchTasks, postTasks, updateTasks } from "./listThunks"


export interface Task {
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
        builder.addCase(fetchTasks.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            const data = action.payload;
            state.tasks = [...state.tasks, ...Object.values(data)];
            state.loading = false
        })
        builder.addCase(postTasks.fulfilled, (state, action) => {
            const newTask = action.payload;
            state.tasks = [...state.tasks, newTask];
        })
    }
})
