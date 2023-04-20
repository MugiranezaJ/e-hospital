import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
console.log("url", process.env.BASE_URL)

const config = axios.create({
    baseURL: process.env.BASE_URL
})
config.defaults.headers.post['Content-Type'] ='application/json';

export default config;