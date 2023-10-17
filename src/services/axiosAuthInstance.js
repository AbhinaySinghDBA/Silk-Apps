import axios from 'axios';
import { AUTH_API_BASE_PATH } from "../styles/constants"
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosAuthInstance = axios.create({ baseURL: AUTH_API_BASE_PATH });

axiosAuthInstance.interceptors.request.use(async (config) => {
    const user = await AsyncStorage.getItem('userVerifiedDetails');
    let userData = JSON.parse(user);
    const token = userData?.access_token

    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default axiosAuthInstance;
