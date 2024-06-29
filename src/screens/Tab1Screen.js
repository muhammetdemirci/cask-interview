import React from 'react';
import {View, Text} from 'react-native';

export function Tab1Screen() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{margin: 16, color: 'black'}}>Tab 1</Text>
      <Text style={{margin: 16, color: 'black'}}>Native Stack Navigator</Text>
    </View>
  );
}
