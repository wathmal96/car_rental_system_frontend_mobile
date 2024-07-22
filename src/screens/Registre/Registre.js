import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import createAxiosInstance from "../../service/axiosOrder";

export default function Registre() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const theme = useTheme();

    const register = async () => {
        console.log("Email:", email);
        console.log("Password:", password);

        // try {
        //     const axiosInstance = await createAxiosInstance();

        //     const response = await axiosInstance.post('/register', {
        //         name,
        //         email,
        //         password
        //     });

        //     console.log("Response:", response.data);
        // } catch (error) {
        //     console.error("Error during registration:", error);
        // }
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
            <Button mode="contained" onPress={register} style={styles.button}>
                Register
            </Button>
            <Button mode="text" onPress={() => navigation.navigate("Login")} style={styles.link}>
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
