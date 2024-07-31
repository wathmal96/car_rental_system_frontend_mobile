import * as React from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function CardContent({ expanded = false, onPress, image, model, endDate, price, startDate, orderDate, payment }) {
    const [heightAnim] = React.useState(new Animated.Value(0));  // Initialize height animation value

    React.useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: expanded ? 150 : 0, // Adjust the value based on the expanded state
            duration: 200, // Shorter duration for a faster animation
            useNativeDriver: false, // Use native driver for better performance
        }).start();
    }, [expanded]);  // Run the animation when 'expanded' changes

    return (
        <Card onPress={onPress} style={styles.card}>
            <Card.Content>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: `http://192.168.43.131:8080/assets/${image}` }} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text variant="titleLarge" style={styles.modelText}>Model: {model}</Text>
                        <Text variant="bodyMedium" style={styles.dateText}>End Date: {endDate}</Text>
                    </View>
                </View>

                <Animated.View style={[styles.expandableContent, { height: heightAnim }]}>
                    <Text variant="bodyMedium" style={styles.bodyText}>Price: {price}</Text>
                    <Text variant="bodyMedium" style={styles.bodyText}>Start Date: {startDate}</Text>
                    <Text variant="bodyMedium" style={styles.bodyText}>Order Date: {orderDate}</Text>
                    <Text variant="bodyMedium" style={styles.bodyText}>Payment: {payment}</Text>
                </Animated.View>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',         // Arrange children in a row
        justifyContent: 'space-between', // Space between items
        alignItems: 'center',         // Align items vertically centered
        marginBottom: 16,             // Margin below the container
    },
    textContainer: {
        marginLeft: 16,              // Margin to the left of the text container
    },
    card: {
        margin: 10,                  // Margin around the card
        padding: 10,                 // Padding inside the card
        borderRadius: 10,            // Rounded corners
        shadowColor: '#000',         // Shadow color
        shadowOffset: { width: 0, height: 2 },  // Shadow offset
        shadowOpacity: 0.3,          // Shadow opacity
        shadowRadius: 4,             // Shadow radius
        elevation: 5,                // Elevation for Android shadow
    },
    image: {
        width: 80,                   // Smaller width for the image
        height: 80,                  // Smaller height for the image
        borderRadius: 10,            // Slightly rounded corners
        resizeMode: 'contain',       // Ensure the full image is displayed within the specified dimensions
    },
    modelText: {
        fontWeight: 'bold',          // Bold text for the model name
        marginBottom: 4,             // Margin below the model name
    },
    dateText: {
        color: '#757575',            // Gray color for the date text
        marginBottom: 4,             // Margin below the date text
    },
    expandableContent: {
        overflow: 'hidden',          // Hide content that overflows the container
    },
    bodyText: {
        marginBottom: 4,             // Margin below each body text item
    },
});
