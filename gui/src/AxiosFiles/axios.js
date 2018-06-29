import axios from 'axios';

const API = axios.create({
	baseURL: 'http://35.238.122.18:3000/'
});

export default API;