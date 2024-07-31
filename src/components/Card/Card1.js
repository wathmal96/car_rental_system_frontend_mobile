import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';

const LeftContent = props => <Avatar.Icon {...props} icon="car" />;

export default function Card1({ model, brand, engineCapacity, price, payment, image, images, startDate, endDate, orderDate, carId }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ModalScreen", { model, brand, engineCapacity, price, payment, images, startDate, endDate, orderDate, carId });
  };

  return (
    <Card style={styles.card}>
      <Card.Title 
        title={model} 
        subtitle={`Brand: ${brand}`} 
        left={LeftContent} 
        titleStyle={styles.title} 
        subtitleStyle={styles.subtitle}
      />
      <Card.Content>
        <Text variant="bodyMedium" style={styles.price}>Price: {price}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: `http://192.168.43.131:8080/assets/${image}` }} style={styles.cover} />
      <Card.Actions>
        <Button onPress={() => console.log('Cancel pressed')} style={styles.button}>Cancel</Button>
        <Button onPress={handlePress} style={styles.button}>View</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    padding:5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  payment: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  cover: {
    height: 200,
    resizeMode: 'cover',
  },
  button: {
    margin: 5,
  },
});
