import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const URL = 'https://david-js-23-default-rtdb.europe-west1.firebasedatabase.app';

export const fetchTasks = createAsyncThunk(
    'tasks/fetch',
    async () => {
        const response = await axios.get<string>(URL + '/tasks.json');
        return response.data
    }
)