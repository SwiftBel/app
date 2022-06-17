import React, { useEffect, useReducer, useState } from 'react';
import { Text, StatusBar, SafeAreaView, View, FlatList, RefreshControl, AppState, Image, TouchableOpacity } from 'react-native';
import {getBannerDetails} from '../../../../store/actions/Profile.action'
import { channelsReducer } from '../reducer/channels';
import Channel from '../component/channel';
import { handleNotificationAction } from '../utils';
import { palette } from '../../../../theme';
import { Chat } from '../../../../assets';
import {useDispatch,useSelector} from 'react-redux'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
  } from '../../../../utils/Responsive/index'
const Channels = props => {
  const { route, navigation, sendbird, currentUser } = props;
  const [query, setQuery] = useState(null);
  const profileData = useSelector(state => state.Profile)
  const [state, dispatch] = useReducer(channelsReducer, {
    sendbird,
    currentUser,
    channels: [],
    channelMap: {},
    loading: false,
    empty: '',
    error: null,
  });
  const topTabData=[
    'Messages'
  ]
  // on state change
  useEffect(() => {
    sendbird.addConnectionHandler('channels', connectionHandler);
    sendbird.addChannelHandler('channels', channelHandler);
    sendbird.updateCurrentUserInfoWithProfileImage(currentUser.nickname,{
      "name": "profile.png", 
      "type": "image/png", 
      "uri":profileData.bannerDetails.logoImage
  } )
    const unsubscribe = AppState.addEventListener('change', handleStateChange);
    if (!sendbird.currentUser) {
      sendbird.connect(currentUser.userId, (err, _) => {
        if (!err) {
          refresh();
        } else {
          dispatch({
            type: 'end-loading',
            payload: {
              error: 'Connection failed. Please check the network status.',
            },
          });
        }
      });
    } else {
      refresh();
    }

    return () => {
      dispatch({ type: 'end-loading' });
      sendbird.removeConnectionHandler('channels');
      sendbird.removeChannelHandler('channels');
      unsubscribe.remove();
    };
  }, []);

  useEffect(() => {
    if (route.params && route.params.action) {
      const { action, data } = route.params;
      switch (action) {
        case 'leave':
          data.channel.leave(err => {
            if (err) {
              dispatch({
                type: 'error',
                payload: {
                  error: 'Failed to leave the channel.',
                },
              });
            }
          });
          break;
      }
    }
  }, [route.params]);

  useEffect(() => {
    if (query) {
      next();
    }
  }, [query]);

  /// on connection event
  const connectionHandler = new sendbird.ConnectionHandler();
  connectionHandler.onReconnectStarted = () => {
    dispatch({
      type: 'error',
      payload: {
        error: 'Connecting..',
      },
    });
  };
  connectionHandler.onReconnectSucceeded = () => {
    dispatch({ type: 'error', payload: { error: null } });
    refresh();

    handleNotificationAction(navigation, sendbird, currentUser, 'channels').catch(err => console.error(err));
  };
  connectionHandler.onReconnectFailed = () => {
    dispatch({
      type: 'error',
      payload: {
        error: 'Connection failed. Please check the network status.',
      },
    });
  };
console.log(currentUser,"::::::")
  const startChat = () => {
    if (currentUser) {
      navigation.navigate('Invite', { currentUser });
    }
  };
  /// on channel event
  const channelHandler = new sendbird.ChannelHandler();
  channelHandler.onUserJoined = (channel, user) => {
    if (user.userId === sendbird.currentUser.userId) {
      dispatch({ type: 'join-channel', payload: { channel } });
    }
  };
  channelHandler.onUserLeft = (channel, user) => {
    if (user.userId === sendbird.currentUser.userId) {
      dispatch({ type: 'leave-channel', payload: { channel } });
    }
  };
  channelHandler.onChannelChanged = channel => {
    dispatch({ type: 'update-channel', payload: { channel } });
  };
  channelHandler.onChannelDeleted = channel => {
    dispatch({ type: 'delete-channel', payload: { channel } });
  };

  const handleStateChange = newState => {
    if (newState === 'active') {
      sendbird.setForegroundState();
    } else {
      sendbird.setBackgroundState();
    }
  };
  const chat = channel => {
    navigation.navigate('Chat', {
      channel,
      currentUser,
    });
  };
  const refresh = () => {
    setQuery(sendbird.GroupChannel.createMyGroupChannelListQuery());
    dispatch({ type: 'refresh' });
  };
  const next = () => {
    if (query.hasNext) {
      dispatch({ type: 'start-loading' });
      query.limit = 20;
      query.next((err, fetchedChannels) => {
        dispatch({ type: 'end-loading' });
        if (!err) {
          dispatch({
            type: 'fetch-channels',
            payload: { channels: fetchedChannels },
          });
        } else {
          dispatch({
            type: 'error',
            payload: {
              error: 'Failed to get the channels.',
            },
          });
        }
      });
    }
  };
  return (
    <>
      <StatusBar  barStyle='dark-content' />
      <SafeAreaView style={style.container}>
      <View style={style.tabBarContainer}>
               {
                   topTabData.map((item,index)=>
                   <TouchableOpacity 
                   key={index}
                   style={{
                    backgroundColor:palette.white,height:25,
                    borderBottomWidth:2
                 }} onPress={()=>{
                    setSelectIndex(index)
                    ref.scrollToIndex({animated:true,index:index})}}>
                    <Text style={[style.tabBarText,{
                        color:palette.black
                    }]}>{item}</Text>
                </TouchableOpacity >
                   )
               }
           </View>
        <FlatList
          data={state.channels}
          renderItem={({ item }) => <Channel key={item.url} channel={item} onPress={channel => chat(channel)} />}
          keyExtractor={item => item.url}
          refreshControl={
            <RefreshControl refreshing={state.loading} colors={['#742ddd']} tintColor={'#742ddd'} onRefresh={refresh} />
          }
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={
            state.error && (
              <View style={style.errorContainer}>
                <Text style={style.error}>{state.error}</Text>
              </View>
            )
          }

          ListEmptyComponent={
            <View style={style.emptyContainer}>
              <Text style={style.empty}>{state.empty}</Text>
            </View>
          }
          onEndReached={() => next()}
          onEndReachedThreshold={0.5}
        />
        <TouchableOpacity onPress={startChat}>
          <View style={style.bottomChatButton}>
            <Image source={Chat} style={{ width: 25, height: 25, alignSelf: 'center', tintColor: 'white' }} />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const style = {
  container: {
    flex: 1,
    backgroundColor: palette.white
  },
  errorContainer: {
    backgroundColor: '#333',
    opacity: 0.8,
    padding: 10,
  },
  error: {
    color: '#fff',
  },
  loading: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 24,
    color: '#999',
    alignSelf: 'center',
  },
  bottomChatButton: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: palette.pink,
    elevation: 3,
    shadowRadius: 1.22,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 1.0
  },
  tabBarContainer:{
    flexDirection:'row',
    marginTop:Platform.OS==='ios'? hp('2%'):hp('1%'),
    marginLeft:20,
    marginBottom:10,
    // borderBottomWidth:1,
    // borderColor:palette.smokeWhite
},
tabBarText:{
    textAlign:'center',
    fontSize:16
},
};

export default Channels;
