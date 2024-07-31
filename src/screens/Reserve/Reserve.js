import { Button, Card } from 'react-native-paper';
import Card1 from "../../components/Card/Card1";
import DatePicker from "../../components/DatePicker/DatePicker";
import { useEffect, useState } from "react";
import createAxiosInstance from "../../service/axiosOrder";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import CarView from '../../components/CarView/CarView';
import { ModalScreen } from '../../components/FullScreenModal/FullScreenModal';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

export default function Reserve({ navigation }) {
    // Get today's date
    const today = new Date();
    // Get the date 5 days from today
    const fiveDaysFromToday = new Date(today);
    fiveDaysFromToday.setDate(today.getDate() + 5);

    // Format the dates to YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const [cars, setCars] = useState([]);
    const [startDate, setStartDate] = useState(formatDate(today));
    const [endDate, setEndDate] = useState(formatDate(fiveDaysFromToday));

    useEffect(() => {
        console.log('Component mounted');
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            console.log('Screen gained focus');
            getAll();
        }, [startDate, endDate])
    );

    useEffect(() => {
        if (range.endDate) {
            setStartDate(extractDateWithoutTime(new Date(range.startDate)));
            setEndDate(extractDateWithoutTime(new Date(range.endDate)));
        }
        console.log(range);
    }, [range]);

    const getAll = async () => {
        try {
            const axiosInstance = await createAxiosInstance();
            const response = await axiosInstance.get(`/car/available?startDate=${startDate}&endDate=${endDate}`);
            // Alert.alert(`cars available from ${startDate} to ${endDate}`)
            console.log("--------------------------");
            console.log(endDate);
            console.log(startDate);
            setCars(response.data);
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
                    Alert.alert('Error', 'An error occurred while fetching available cars. Please try again later.');
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

    function extractDateWithoutTime(dateObj) {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const RootStack = createStackNavigator();

    return (
        <View style={styles.container}>
            <View style={styles.stickyHeader}>
                <DatePicker range={range} setRange={setRange} />
                <Text style={styles.text}>cars available from : {startDate} to : {endDate}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {cars.map((val, index) => {
                    const imagePath = val.images[0] ? val.images[0].filePath : null;
                    console.log(val.model);
                    console.log(val.brand);
                    // console.log(val.images[0].filePath);
                    return (
                        <Card1
                            key={index}
                            model={val.model}
                            brand={val.brand}
                            engineCapacity={val.engineCapacity}
                            price={val.price}
                            payment={val.payment}
                            image={imagePath ? imagePath : undefined}
                            images={val.images}
                            startDate={startDate}
                            endDate={endDate}
                            orderDate={formatDate(today)}
                            carId={val.id}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stickyHeader: {
        paddingBottom: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1, // Ensure it stays above other content
        backgroundColor: 'white', // Background color to cover content beneath
    },
    scrollViewContent: {
        paddingTop: 98,
        paddingHorizontal: 10 // Height of the sticky header to avoid overlap
    },
    text: {
        padding: 10, // Add padding around the text
        backgroundColor: '#f0f0f0', // Light grey background for the text box
        borderRadius: 5, // Rounded corners for the text box
        marginTop: 10, // Margin at the top of the text box
        marginHorizontal: 10, // Margin on the left and right of the text box
    },
});
