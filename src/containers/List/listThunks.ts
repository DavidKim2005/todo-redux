import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { Task, listSlice } from "./listSlice";


const URL = 'https://david-js-23-default-rtdb.europe-west1.firebasedatabase.app';

export const fetchTasks = createAsyncThunk(
    'tasks/fetch',
    async () => {
        const response = await axios.get<string>(URL + '/tasks.json');
        return response.data
    }
)

export const updateTasks = createAsyncThunk<void, undefined, {state: RootState}>(
    'tasks/update',
    async(_arg, thunkAPI) => {
        const currentStatus = thunkAPI.getState().tasks.tasks
        const updateStatus = currentStatus.map(task => ({
            ...task, status: !task.status
        }))
        await axios.put(URL + '/tasks.json', updateStatus)
    }
)

export const postTasks = createAsyncThunk<void, Task, {state: RootState}>(
    'tasks/post',
    async (newTask, thunkAPI) => {
        try {
            await axios.post(URL + '/tasks.json', newTask)
            const currentTask = thunkAPI.getState().tasks.tasks
            const updatedList = [...currentTask, newTask];
            thunkAPI.dispatch(listSlice.actions.setTasks(updatedList))
        } catch (e) {
            console.log(e);
        }
    }
)