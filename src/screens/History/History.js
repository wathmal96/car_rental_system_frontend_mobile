import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Burrowed from '../Burrowed/Burrowed';
import Unburrowed from '../Unburrowed/Unburrowed';
import Handovered from '../HandOvered/HandOvered';
import { useEffect } from 'react';

const Tab = createMaterialTopTabNavigator();

export default function History() {

  useEffect(()=> {
    console.log('call function');
  },[])

  return (
    <Tab.Navigator>
      <Tab.Screen name="Burrowed" component={Burrowed} />
      <Tab.Screen name="Unburrowed" component={Unburrowed} />
      <Tab.Screen name="Handovered" component={Handovered} />
    </Tab.Navigator>
  );
}