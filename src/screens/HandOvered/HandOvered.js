import { Text } from "react-native-paper";
import Accordion from "../../components/Accordion/Accordion";
import createAxiosInstance from "../../service/axiosOrder";
import { useState, useEffect } from "react";
import { useIsFocused, useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";
import { Alert } from "react-native";

export default function HandOvered() {
    const [reservations, setReservations] = useState([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            console.log('Screen gained focus');
            getAll();
        }, [isFocused])
    );

    const getAll = async () => {
        try {
            const axiosInstance = await createAxiosInstance();
            const id = await AsyncStorage.getItem("id");

            const response = await axiosInstance.get(`/reservation/get_by_customer/${id}/status/handover`);
            setReservations(response.data);
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401 && error.response.data.error === 'JWT Token has expired') {
                    Alert.alert('Session Expired', 'Your session has expired. Please log in again.', [
                        {
                            text: 'OK',
                            onPress: async () => {
                                await AsyncStorage.multiRemove(["login", "name", "mail", "id"]);
                                navigation.navigate("Login2");
                            }
                        }
                    ]);
                } else {
                    console.error("Server responded with error:", error.response.data);
                    Alert.alert('Error', 'An error occurred while fetching reservations. Please try again later.');
                }
            } else if (error.request) {
                console.error("No response received:", error.request);
                Alert.alert('Error', 'No response received from the server. Please check your internet connection and try again.');
            } else {
                console.error("Error setting up request:", error.message);
                Alert.alert('Error', 'An error occurred. Please try again later.');
            }
        }
    };

    return (
        <Accordion dataArray={reservations} />
    );
}
