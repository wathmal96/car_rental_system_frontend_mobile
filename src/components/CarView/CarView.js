import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import Card1 from "../Card/Card1";
import React from 'react';

export default function CarView({route}) {
    const { cars } = route.params;
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            
            {cars.map((val, index) => {
                const imagePath = val.images[0] ? val.images[0].filePath : null;
                return (
                    <Card1
                        key={index}
                        model={val.model}
                        price={val.price}
                        image={imagePath ? imagePath : undefined}
                    />
                );
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    scrollViewContent: {
        paddingTop: 100, // Height of the sticky header to avoid overlap
    },
});