import React from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {hex_to_ascii} from '../utils';

export function Tab1Screen3() {
  const {
    params: {url_hex},
  } = useRoute();

  const getYoutubeVideoIdFromUrl = url => {
    var temp = url.replace('https://youtu.be/', '');
    temp = temp.replace('https://www.youtube.com/watch?v=', '');
    return temp.substring(0, 11);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{margin: 16, color: 'black'}}>Tab 1</Text>
      <Text style={{margin: 16, color: 'black'}}>Screen 3</Text>
      <YoutubePlayer
        height={300}
        width={300}
        play
        videoId={getYoutubeVideoIdFromUrl(hex_to_ascii(url_hex))}
      />
    </View>
  );
}
