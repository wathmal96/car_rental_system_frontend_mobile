import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure you import AsyncStorage

const createAxiosInstance = async () => {
  const token = await AsyncStorage.getItem("login");

  const instance = axios.create({
    baseURL: 'http://192.168.43.131:8080',
    // headers: { Authorization: `Bearer ${token}` }
  });

  return instance;
};

export default createAxiosInstance;
