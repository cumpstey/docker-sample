import axios from 'axios';
import config from '../configuration';

const { rootUrl } = config;
const request = axios.create({ baseURL: rootUrl, withCredentials: true });

export default request;
