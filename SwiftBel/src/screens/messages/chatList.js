import React, { useState, useLayoutEffect, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { showMessage } from 'react-native-flash-message';

import {  palette } from '../../theme';
import { TwilioService } from './TwilioServices';
import { useApp } from './AppContext';
import { Delete } from '../../assets';
import axios from 'axios';

import {getToken} from '../../store/actions/Profile.action'
export default function ChatListScreen({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const { channels, updateChannels } = useApp();
  const channelPaginator = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate(routes.ChatCreat.name)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const setChannelEvents = useCallback(
    (client) => {
      client.on('messageAdded', (message) => {
        updateChannels((prevChannels) =>
          prevChannels.map((channel) =>
            channel.id === message.channel.sid ? { ...channel, lastMessageTime: message.dateCreated } : channel,
          ),
        );
      });
      return client;
    },
    [updateChannels],
  );

  const getSubscribedChannels = useCallback(
    (client) =>
      client.getSubscribedChannels().then((paginator) => {
        channelPaginator.current = paginator;
        const newChannels = TwilioService.getInstance().parseChannels(channelPaginator.current.items);
        updateChannels(newChannels);
      }),
    [updateChannels],
  );

 
  useEffect(() => {
    getToken()
      .then((token) => TwilioService.getInstance().getChatClient(token))
      .then(() => TwilioService.getInstance().addTokenListener(getToken))
      .then(setChannelEvents)
      .then(getSubscribedChannels)
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    return () => TwilioService.getInstance().clientShutdown();
  }, [setChannelEvents, getSubscribedChannels]);

  const sortedChannels = useMemo(
    () => channels.sort((channelA, channelB) => channelB.lastMessageTime - channelA.lastMessageTime),
    [channels],
  );

  return (
    <View style={styles.screen}>
        <FlatList
          data={sortedChannels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>{
            return (
                <TouchableOpacity style={styles.card} onPress={onPress}>
                  <Image style={styles.cardIcon} source={Delete} />
                  <Text style={styles.cardText}>{item?.name}</Text>
                </TouchableOpacity>
              )
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.white,
  },
  addButton: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24,
    color: palette.white,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: palette.grey,
    backgroundColor: palette.white,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardIcon: {
    height: 44,
    width: 44,
  },
  cardText: {
    fontSize: 16,
    color: palette.babyPink,
    marginLeft: 24,
    marginRight: 8,
  },
});