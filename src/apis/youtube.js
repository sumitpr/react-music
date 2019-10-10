import axios from 'axios';

const KEY = "AIzaSyCnZ5UYD4Slv9GDpLlTfBf-Dc4LNCdKPoM";

const youtube = axios.create({
	baseURL: "https://www.googleapis.com/youtube/v3",
	params: {
		part: "snippet",
		key: KEY
	}
});

export default youtube;