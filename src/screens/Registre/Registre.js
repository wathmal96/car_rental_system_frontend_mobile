import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import createAxiosInstance from "../../service/axiosOrder"; // Ensure this is correctly imported

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state
    const navigation = useNavigation();
    const theme = useTheme();

    const register = async () => {
        if (!name || !email || !password) {
            Alert.alert("Validation Error", "Please fill in all fields.");
            return;
        }

        setLoading(true); // Set loading to true before making the request

        try {
            const axiosInstance = await createAxiosInstance();
            const response = await axiosInstance.post('/customer/new', {
                name,
                email,
                password
            });

            Alert.alert("Success", "Registration successful!");
            console.log("Response:", response.data);
            navigation.navigate("Login2"); // Navigate to login screen upon successful registration
        } catch (error) {
            console.error("Error during registration:", error);

            // Handle different types of errors
            if (error.response) {
                // Server responded with a status other than 2xx
                Alert.alert("Registration Error", error.response.data.message || "An error occurred during registration.");
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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Please fill in the details to register</Text>
            <TextInput
                mode="outlined"
                label="Name"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                theme={{ colors: { primary: theme.colors.primary } }}
            />
            <TextInput
                mode="outlined"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
                theme={{ colors: { primary: theme.colors.primary } }}
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
            />
            <Button 
                mode="contained" 
                onPress={register} 
                style={styles.button}
                loading={loading} // Show loading spinner
                disabled={loading} // Disable button while loading
            >
                Register
            </Button>
            <Button 
                mode="text" 
                onPress={() => navigation.navigate("Login")} 
                style={styles.link}
            >
                Login
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
        backgroundColor: '#6200ee', // Customize the button color
    },
    link: {
        marginTop: 10,
        color: '#6200ee', // Customize the link color
    },
});
