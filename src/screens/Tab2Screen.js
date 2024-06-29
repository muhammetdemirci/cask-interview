import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import RNPickerSelect from 'react-native-picker-select';
import {isNumeric} from '../utils';
import {useHeaderHeight} from '@react-navigation/elements';
import {sendNotification} from '../api';

// • 1 - Sadece Metin
// • 2 - Img URL
// • 3 - Youtube URL
const PN_TYPES = [
  {
    value: 1,
    label: 'Sadece Metin',
  },
  {
    value: 2,
    label: 'Img URL',
  },
  {
    value: 3,
    label: 'Youtube URL',
  },
];

export function Tab2Screen() {
  const [fcmToken, setFcmToken] = useState('');
  const [selectedPNType, setSelectedPNType] = useState(null);
  const [delay, setDelay] = useState('');

  const height = useHeaderHeight();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    setFcmToken(token);
  };

  const onSend = async () => {
    sendNotification(fcmToken, selectedPNType, Number(delay));
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}>
      <Text style={{margin: 16, color: 'black'}}>Tab 2</Text>
      <Text style={{fontWeight: '500', margin: 8, color: 'black'}}>
        FCM Token
      </Text>
      <Text style={{color: 'black'}}>{fcmToken}</Text>
      <KeyboardAvoidingView
        keyboardVerticalOffset={height + 47}
        behavior="padding"
        style={{width: '100%'}}
        enabled>
        <RNPickerSelect
          placeholder={{label: 'Select PN Type'}}
          value={selectedPNType}
          onValueChange={value => {
            setSelectedPNType(value);
          }}
          items={PN_TYPES}
          style={{
            placeholder: {
              color: 'black',
            },
            inputAndroid: {color: 'black'},
          }}
        />
        <TextInput
          style={{
            width: '300',
            height: 40,
            borderWidth: 1,
            borderRadius: 8,
            paddingLeft: 8,
            margin: 16,
            color: 'black',
          }}
          placeholderTextColor={'black'}
          placeholder="Delay"
          value={delay}
          keyboardType={'numeric'}
          onChangeText={value => {
            if (isNumeric(value)) setDelay(value);
          }}
          onSubmitEditing={() => onSend()}
        />
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onSend}>
        <Text style={{color: 'white', padding: 16, fontSize: 18}}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}
