import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Navigator} from './src/navigation/navigator';
import {pnStorage} from './src/db/pn';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await pnStorage.saveNotification(remoteMessage);
});

export function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await pnStorage.saveNotification(remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return <Navigator />;
}
// export default class App extends React.Component {
//     constructor( props ) {
//         super( props )
//     }

//     /*
//         Örnek "Request":

//         const data = {
//             "v": 1,
//             "platform": "app",
//             "admmdlid": "12f3894ed72fc7d4e3b98688b20513e20a3fa1adbd08b9662412322138d26533",
//             "scope": "8fbff85cb7a2b8cbd53b3086c0b16d4c1e96a5d748cbf8761bace32ab294e83a",
// //-->          ^ Yukarıdaki 4 key API'ın çalışması için zorunludur. Eksik olmaları durumunda API hata (418) verecektir.

//             "fcm_token": fcm_token,
//             "pn_type": 3,
//             "pn_delay": 1,
//             "dev_mode": false
//         }

//         const response = await fetch(
//             "https://challenges.cask.com.tr/api",
//             {
//                 method: "POST",
//                 cache: "no-cache",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             }
//         )
//      */

//     render() {
//         return (<Navigator />)
//     }
// }
