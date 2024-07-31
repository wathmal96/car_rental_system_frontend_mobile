import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createAxiosInstance from "../../service/axiosOrder";

export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state
    const navigation = useNavigation();
    const theme = useTheme();

    const login = async () => {
        if (!name || !password) {
            Alert.alert("Validation Error", "Please enter both email and password.");
            return;
        }

        setLoading(true); // Set loading to true before the request

        try {
            const axiosInstance = await createAxiosInstance();
            const response = await axiosInstance.post('/customer/authenticate', {
                name: name,
                password: password,
                roles: "customer"
            });

            const { token, email, id: idNumber } = response.data;
            const id = String(idNumber); // Convert id to a string

            await AsyncStorage.multiSet([
                ['login', token],
                ['name', name],
                ['mail', email],
                ['id', id]
            ]);

            navigation.navigate("Drawer");
        } catch (error) {
            // console.error("Error during login:", error);

            // Handle different types of errors
            if (error.response) {
                // Server responded with a status other than 2xx
                Alert.alert("Login Error", error.response.data.message || "An error occurred during login.");
            } else if (error.request) {
                // No response was received
                Alert.alert("Network Error", "No response received from the server. Please try again later.");
            } else {
                // Other errors
                Alert.alert("Error", "An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Please login to continue</Text>
            <TextInput
                mode="outlined"
                label="Email"
                placeholder="Enter your email"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
                theme={{ colors: { primary: theme.colors.primary } }}
                autoComplete="email" // Additional accessibility feature
            />
            <TextInput
                mode="outlined"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                theme={{ colors: { primary: theme.colors.primary } }}
                autoComplete="password" // Additional accessibility feature
            />
            <Button 
                mode="contained" 
                onPress={login} 
                style={styles.button} 
                loading={loading} // Show loading spinner
                disabled={loading} // Disable button while loading
            >
                Login
            </Button>
            <Button 
                mode="text" 
                onPress={() => navigation.navigate("Registre")} 
                style={styles.link}
            >
                Register
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: '#666',
    },
    input: {
        width: '100%',
        marginBottom: 15,
    },
    button: {
        width: '100%',
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: '#6200ee', // You can customize the button color
    },
    link: {
        marginTop: 10,
        color: '#6200ee', // You can customize the link color
    },
});
