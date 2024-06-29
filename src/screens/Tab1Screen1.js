import React from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

export function Tab1Screen1() {
  const {
    params: {title, body},
  } = useRoute();

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{margin: 16, color: 'black'}}>Tab 1</Text>
      <Text style={{margin: 16, color: 'black'}}>Screen 1</Text>

      <Text style={{margin: 16, color: 'black'}}>{title}</Text>
      <Text style={{margin: 16, color: 'black'}}>{body}</Text>
    </View>
  );
}
