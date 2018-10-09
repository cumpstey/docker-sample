import axios from 'axios';
import config from '../configuration';

const { rootUrl } = config;
const request = axios.create({ baseURL: rootUrl });

export default request;
