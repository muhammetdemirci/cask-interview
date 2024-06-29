import {Linking} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import messaging from '@react-native-firebase/messaging';
import {Tab1Screen} from '../screens/Tab1Screen';
import {Tab2Screen} from '../screens/Tab2Screen';
import {Tab3Screen} from '../screens/Tab3Screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Tab1Screen1} from '../screens/Tab1Screen1';
import {Tab1Screen2} from '../screens/Tab1Screen2';
import {Tab1Screen3} from '../screens/Tab1Screen3';
import {ascii_to_hexa} from '../utils';

function buildDeepLinkFromNotificationData(remoteMessage) {
  const pnType = remoteMessage?.data.pn_type;
  if (pnType === '1') {
    return `cask://Tab1/Tab1Screen1/${remoteMessage.notification.title}/${remoteMessage.notification.body}`;
  }
  if (pnType === '2') {
    return `cask://Tab1/Tab1Screen2/${ascii_to_hexa(
      remoteMessage.data.img_url,
    )}`;
  }
  if (pnType === '3') {
    return `cask://Tab1/Tab1Screen3/${ascii_to_hexa(
      remoteMessage.data.youtube_url,
    )}`;
  }
  return null;
}

const linking = {
  prefixes: ['cask://'],
  config: {
    initialRouteName: 'Tab2',
    screens: {
      Tab1: {
        screens: {
          Tab1Screen1: {
            path: 'Tab1/Tab1Screen1/:title/:body',
          },
          Tab1Screen2: {
            path: 'Tab1/Tab1Screen2/:url_hex',
          },
          Tab1Screen3: {
            path: 'Tab1/Tab1Screen3/:url_hex',
          },
        },
      },
      Tab2: 'Tab2',
      Tab3: 'Tab3',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener) {
    const onReceiveURL = ({url}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};

const Stack = createNativeStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Tab1Screen"
        component={Tab1Screen}
      />
      <Stack.Screen name="Tab1Screen1" component={Tab1Screen1} />
      <Stack.Screen name="Tab1Screen2" component={Tab1Screen2} />
      <Stack.Screen name="Tab1Screen3" component={Tab1Screen3} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={'Tab2'}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Tab1" component={StackNavigator} />
      <Tab.Screen name="Tab2" component={Tab2Screen} />
      <Tab.Screen name="Tab3" component={Tab3Screen} />
    </Tab.Navigator>
  );
}

export function Navigator() {
  return (
    <NavigationContainer linking={linking}>
      <TabNavigator />
    </NavigationContainer>
  );
}
