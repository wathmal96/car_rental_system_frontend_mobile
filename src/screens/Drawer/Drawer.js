import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Home/Reserve';
import About from '../About/History';
import Reserve from '../Home/Reserve';
import History from '../About/History';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Reserve" component={Reserve} />
      <Drawer.Screen name="History" component={History} />
    </Drawer.Navigator>
  );
}