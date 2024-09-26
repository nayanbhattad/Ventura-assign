import { createAsyncThunk } from "@reduxjs/toolkit"
import { Axios } from "../../config/Axios"

// Async action to fetch all IPOs
export const fetchIpoList = createAsyncThunk('ipo/fetchIpoList', async () => {
    let url = "/ipo"
    const response = await Axios.get(url);
    return response.data;
});

// Async action to fetch IPO by ID
export const fetchIpoById = createAsyncThunk('ipo/fetchIpoById', async (id) => {
    let url  = `/ipo/${id}`
    const response = await Axios.get(url);
    return response.data;
});