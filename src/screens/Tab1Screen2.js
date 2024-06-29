import React from 'react';
import {View, Text, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {hex_to_ascii} from '../utils';

export function Tab1Screen2() {
  const {
    params: {url_hex},
  } = useRoute();

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{margin: 16, color: 'black'}}>Tab 1</Text>
      <Text style={{margin: 16, color: 'black'}}>Screen 2</Text>
      <Image
        source={{uri: hex_to_ascii(url_hex)}}
        style={{
          width: 300,
          height: 300,
        }}
      />
    </View>
  );
}
