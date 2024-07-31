import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { navigate } from './navigationService';

const createAxiosInstance = async () => {
  const token = await AsyncStorage.getItem('login');

  const instance = axios.create({
    baseURL: 'http://192.168.43.131:8080',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

  // Add a response interceptor to handle errors
  // instance.interceptors.response.use(
  //   response => response,
  //   async error => {
  //     if (error.response) {
  //       if (error.response.status === 401 && error.response.data.error === 'JWT Token has expired') {
  //         // Handle JWT expiration
  //         Alert.alert('Session Expired', 'Your session has expired. Please log in again.', [
  //           {
  //             text: 'OK',
  //             onPress: async () => {
  //               await AsyncStorage.multiRemove(["login", "name", "mail", "id"]);
  //               console.log("wathmal");
  //               navigate("Registre"); // Navigate to the login screen
  //             }
  //           }
  //         ]);
  //       } else if (error.response.status === 400 && error.response.data.error === 'Invalid JWT Token') {
  //         // Handle invalid token
  //         Alert.alert('Invalid Token', 'Invalid token. Please log in again.', [
  //           {
  //             text: 'OK',
  //             onPress: async () => {
  //               await AsyncStorage.multiRemove(["login", "name", "mail", "id"]);
  //               navigate('Login2'); // Navigate to the login screen
  //             }
  //           }
  //         ]);
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return instance;
};

export default createAxiosInstance;
