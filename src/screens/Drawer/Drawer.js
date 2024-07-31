import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { Divider } from 'react-native-paper';

import Reserve from '../Reserve/Reserve';
import History from '../History/History';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const [user, setUser] = useState('');
  const [mail, setMail] = useState('');

  const fetchUserData = async () => {
    try {
      const userValue = await AsyncStorage.getItem('name');
      const mailValue = await AsyncStorage.getItem('mail');
      if (userValue) setUser(userValue);
      if (mailValue) setMail(mailValue);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Text style={styles.username}>{user}</Text>
        <Text style={styles.email}>{mail}</Text>
      </View>
      <Divider style={styles.divider} />
      <DrawerItemList {...props} />
      <Divider style={styles.divider} />
      <DrawerItem
        label="Log Out"
        onPress={props.logOut}
        labelStyle={styles.drawerItemLabel}
        style={styles.drawerItem}
      />
    </DrawerContentScrollView>
  );
}

export default function MyDrawer() {
  const navigation = useNavigation();

  const logOut = async () => {
    try {
      await AsyncStorage.multiRemove(["login", "name", "mail", "id"]);
      console.log("logout successfully");
      navigation.navigate("Login2");
    } catch (error) {
      console.error("Error removing item", error);
    }
  };

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} logOut={logOut} />}>
      <Drawer.Screen name="Reserve" component={Reserve} />
      <Drawer.Screen name="History" component={History} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 0,
  },
  drawerHeader: {
    backgroundColor: '#1565C0',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#fff',
  },
  divider: {
    marginVertical: 10,
  },
  drawerItem: {
    marginVertical: 5,
  },
  drawerItemLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
