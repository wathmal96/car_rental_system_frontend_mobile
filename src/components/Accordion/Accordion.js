import * as React from 'react';
import { ScrollView, StyleSheet, View, Animated } from 'react-native';
import { List, MD3Colors, Avatar } from 'react-native-paper';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CardContent from '../CardContent/CardContent';

const Accordion = ({ dataArray }) => {
    const [expandedIndex, setExpandedIndex] = React.useState(null);

    const handlePress = (index) => {
        console.log(index);
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <>
            <ScrollView style={styles.container}>
                {dataArray.map((val, index) => (

                    <CardContent
                        key={index}
                        expanded={expandedIndex === index}
                        onPress={() => handlePress(index)}
                        model={val.car.model}
                        price={val.car.price}
                        payment={val.payment}
                        endDate={val.reservationEndDate}
                        startDate={val.reservationStartDate}
                        orderDate={val.orderDate}
                        image={val.car.images[0].filePath}
                    />
                ))}
            </ScrollView>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    itemContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
    },
    accordion: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    leftAction: {
        flex: 1,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 4,
    },
    rightAction: {
        flex: 1,
        backgroundColor: '#F44336',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 4,
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 10,
        textAlign: 'left',
        width: '100%',
    },
    actionTextRight: {
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 10,
        textAlign: 'right',
        width: '100%',
    },
});

export default Accordion;
