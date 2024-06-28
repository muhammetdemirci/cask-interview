import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Tab1Screen} from '../main-screens/Tab1Screen';
import {Tab2Screen} from '../main-screens/Tab2Screen';
import {Tab3Screen} from '../main-screens/Tab3Screen';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab1" component={Tab1Screen} />
      <Tab.Screen name="Tab2" component={Tab2Screen} />
      <Tab.Screen name="Tab3" component={Tab3Screen} />
    </Tab.Navigator>
  );
}

export function Navigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
