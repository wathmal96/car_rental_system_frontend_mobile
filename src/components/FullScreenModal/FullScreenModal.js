import * as React from 'react';
import { View, Text, Button, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import createAxiosInstance from '../../service/axiosOrder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const { width } = Dimensions.get('window');

export function ModalScreen({ navigation, route }) {
    const { model, brand, engineCapacity, price,payment, images = [],startDate,endDate,orderDate,carId} = route.params;
    
    const reserve = async () => {
        try {
            const axiosInstance = await createAxiosInstance();
            const id = await AsyncStorage.getItem("id");
            const response = await axiosInstance.post('/reservation/reserve', {
                customerId: id,
                carId: carId,
                reservationStartDate: startDate,
                reservationEndDate:endDate,
                orderDate:orderDate
            });
            Alert.alert(
                "Reservation",
                "Your reservation will be approved.",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            setTimeout(()=>navigation.goBack(),2000)
            
        } catch (error) {
            console.error('Error reserve reservations:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                {/* Image Carousel */}
                {images.length > 0 ? (
                    <Carousel
                        width={width}
                        height={width * 0.75}
                        autoPlay={false}
                        data={images}
                        renderItem={({ item }) => (
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: `http://192.168.43.131:8080/assets/${item.filePath}` }}
                                    style={styles.image}
                                />
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.text}>No images available</Text>
                )}
            </View>

            {/* Details Section */}
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Model: {model || 'Model not available'}</Text>
                <Text style={styles.text}>Brand: {brand || 'Brand not available'}</Text>
                <Text style={styles.text}>Engine Capacity: {engineCapacity || 'Engine capacity not available'}</Text>
                <Text style={styles.text}>Price: {price || 'Price not available'}</Text>
                {/* <Text style={styles.text}>Payment: {payment || 'Payment not available'}</Text> */}
            </View>

            {/* Dismiss Button */}
            <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.goBack()} title="Dismiss" />
                <Button onPress={reserve} title="Reserve" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    container: {
        width: '100%',
        alignItems: 'center',
    },
    imageContainer: {
        width: width,
        height: width * 0.75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: '100%',
        resizeMode: 'cover',
    },
    text: {
        fontSize: 20,
        marginVertical: 5,
        textAlign: 'center',
    },
    detailsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 20,
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around"
    },
});

export default ModalScreen;
