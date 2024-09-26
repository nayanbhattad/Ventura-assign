import axios from "axios";

// Axios Basic Configurations
export const Axios = axios.create({
	baseURL: 'http://localhost:3500',
	headers: {
		Accept: 'application/json',
	},
});