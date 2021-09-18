import axios from 'axios';



const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'd75091b7e9fa2bf382ffbb7ef7aa3624',
        language: 'es-ES'
    }
});


export default movieDB;