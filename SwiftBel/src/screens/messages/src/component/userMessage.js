import React, { useEffect, useState } from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import moment from 'moment';
import {getBannerDetails} from '../../../../store/actions/Profile.action'
import { withAppContext } from '../context';
import { palette } from '../../../../theme';
import { ProfileUser } from '../../../../assets';
import { useSelector,useDispatch} from 'react-redux';
const UserMessage = props => {
  const dispatch=useDispatch();
  const { sendbird, channel, message, onPress = () => {}, onLongPress = () => {} } = props;
  const isMyMessage = message.sender.userId === sendbird.currentUser.userId;
  const [readReceipt, setReadReceipt] = useState(channel.members.length - 1);
  const profileData = useSelector(state => state.Profile)
  useEffect(() => {
    const channelHandler = new sendbird.ChannelHandler();
    sendbird.updateCurrentUserInfoWithProfileImage(message.sender.nickname,{
      "name": "profile.png", 
      "type": "image/png", 
      "uri":profileData.bannerDetails.logoImage
  } )
    channelHandler.onReadReceiptUpdated = targetChannel => {
      if (targetChannel.url === channel.url) {
        setReadReceipt(channel.getUnreadMemberCount(message));
      }
    };

    sendbird.addChannelHandler(`message-${message.reqId}`, channelHandler);
    setReadReceipt(channel.getUnreadMemberCount(message));
    return () => {
      sendbird.removeChannelHandler(`message-${message.reqId}`);
    };
  }, []);
console.log(message.sender,"??????")
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress(message)}
      onLongPress={() => onLongPress(message)}
      style={{
        ...style.container,
        flexDirection: isMyMessage ? 'row-reverse' : 'row',
      }}
    >
      <View style={style.profileImageContainer}>
        {!message.hasSameSenderAbove && (
          message.sender.profileUrl?
          <Image source={{ uri: message.sender.profileUrl }} style={style.profileImage} />:
          <Image source={ProfileUser} style={style.profileImage} />
        )}
      </View>
      <View style={{ ...style.content, alignItems: isMyMessage ? 'flex-end' : 'flex-start' }}>
        {!message.hasSameSenderAbove && <Text style={style.nickname}>{message.sender.nickname}</Text>}
        <View style={{ ...style.messageBubble, backgroundColor: isMyMessage ? palette.pink : palette.smokeWhite }}>
          <Text style={{ ...style.message, color: isMyMessage ? '#fff' : '#333' }}>{message.message}</Text>
        </View>
      </View>
      <View style={{ ...style.status, alignItems: isMyMessage ? 'flex-end' : 'flex-start' }}>
        {message.sendingStatus === 'pending' && (
          <Progress.Circle size={10} indeterminate={true} indeterminateAnimationDuration={800} color="#999" />
        )}
        {message.sendingStatus === 'succeeded' && readReceipt > 0 && (
          <Text style={style.readReceipt}>{readReceipt}</Text>
        )}
        <Text style={style.updatedAt}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = {
  container: {
    paddingHorizontal: 4,
    marginVertical: 2,
  },
  profileImageContainer: {
    width: 32,
    height: 32,
    marginHorizontal: 8,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderWidth: 0,
    borderRadius: 16,
    marginTop: 20,
  },
  content: {
    alignSelf: 'center',
    marginHorizontal: 4,
  },
  nickname: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#888',
    marginHorizontal: 8,
  },
  messageBubble: {
    maxWidth: 240,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginTop: 2,
  },
  message: {
    fontSize: 18,
  },
  status: {
    alignSelf: 'flex-end',
    marginHorizontal: 3,
    marginBottom: 3,
  },
  readReceipt: {
    fontSize: 12,
    color: '#f89',
  },
  updatedAt: {
    fontSize: 12,
    color: '#999',
  },
};

export default withAppContext(UserMessage);
