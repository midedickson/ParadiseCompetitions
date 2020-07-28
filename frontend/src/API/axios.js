import * as ax from "axios";

const axios = ax.create({
	baseURL: 'https://paradisebackend.herokuapp.com',
	headers: {
		'Content-Type': 'application/json',
	  }
});


axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth-token');
    config.headers.Authorization = token ? `Token ${token}` : '';
    return config;
});

export default axios




