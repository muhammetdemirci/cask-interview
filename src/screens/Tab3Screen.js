import React, {useEffect, useState} from 'react';
import {View, Text, RefreshControl, TouchableOpacity} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {pnStorage} from '../db/pn';
import {useNavigation} from '@react-navigation/native';
import {ascii_to_hexa} from '../utils';

export function Tab3Screen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    setLoading(true);
    const data = await pnStorage.getData();
    setNotifications(data);
    setLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 8,
      }}>
      <Text style={{margin: 16, color: 'black'}}>Tab 3</Text>
      <FlashList
        data={notifications}
        renderItem={({item}) => <NotificationCard item={item} />}
        estimatedItemSize={300}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getNotifications} />
        }
      />
    </View>
  );
}

function NotificationCard({item}) {
  const navigation = useNavigation();

  const openNotificationScreen = () => {
    if (item.data.pn_type == 1) {
      navigation.navigate('Tab1Screen1', {
        title: item.notification.title,
        body: item.notification.body,
      });
    } else if (item.data.pn_type == 2) {
      navigation.navigate('Tab1Screen2', {
        url_hex: ascii_to_hexa(item.data.img_url),
      });
    } else if (item.data.pn_type == 3) {
      navigation.navigate('Tab1Screen3', {
        url_hex: ascii_to_hexa(item.data.youtube_url),
      });
    }
  };

  return (
    <TouchableOpacity style={{margin: 8}} onPress={openNotificationScreen}>
      <Text style={{color: 'black'}}>{item.notification.title}</Text>
      <Text style={{color: 'black'}}>{item.notification.body}</Text>
    </TouchableOpacity>
  );
}
