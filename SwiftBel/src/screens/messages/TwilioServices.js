import { Client } from 'twilio-chat';

export class TwilioService {
  static serviceInstance;
  static chatClient;

  constructor() {}

  static getInstance() {
    if (!TwilioService.serviceInstance) {
      TwilioService.serviceInstance = new TwilioService();
    }
    return TwilioService.serviceInstance;
  }

  async getChatClient(twilioToken) {
      console.log(TwilioService.chatClient,"client")
      console.log(Client.create("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2Q2MTlmNjkyZjYyYmVkOTY2ZWYyOTVjNDI0NWJlMzk1LTE2NTI4MDUyNzAiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJwcmFrYXNoQ2hhbmNoYWwiLCJjaGF0Ijp7InNlcnZpY2Vfc2lkIjoiSVNhYzEzODdlNTRmYWI0NTQzYjY4ZjI1MDYwMWM1MGUyOCJ9fSwiaWF0IjoxNjUyODA1MjcwLCJleHAiOjE2NTI4MDg4NzAsImlzcyI6IlNLZDYxOWY2OTJmNjJiZWQ5NjZlZjI5NWM0MjQ1YmUzOTUiLCJzdWIiOiJBQzA0MzBkOWVkMjU1YmRiMTkwODcxOTU4ZDRjNzdlMjlhIn0.jblAWCu4jVSle_m8Uudc6KiRNN61mbGL1fbppBtjnr4").then((client) => {return client}),"token")
    if (!TwilioService.chatClient && !twilioToken) {
      throw new Error('Twilio token is null or undefined');
    }
    if (!TwilioService.chatClient && twilioToken) {
        
      return Client.create("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2Q2MTlmNjkyZjYyYmVkOTY2ZWYyOTVjNDI0NWJlMzk1LTE2NTI4MDUyNzAiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJwcmFrYXNoQ2hhbmNoYWwiLCJjaGF0Ijp7InNlcnZpY2Vfc2lkIjoiSVNhYzEzODdlNTRmYWI0NTQzYjY4ZjI1MDYwMWM1MGUyOCJ9fSwiaWF0IjoxNjUyODA1MjcwLCJleHAiOjE2NTI4MDg4NzAsImlzcyI6IlNLZDYxOWY2OTJmNjJiZWQ5NjZlZjI5NWM0MjQ1YmUzOTUiLCJzdWIiOiJBQzA0MzBkOWVkMjU1YmRiMTkwODcxOTU4ZDRjNzdlMjlhIn0.jblAWCu4jVSle_m8Uudc6KiRNN61mbGL1fbppBtjnr4").then((client) => {
        TwilioService.chatClient = client
        return TwilioService.chatClient;
      });
    }
    return Promise.resolve().then(() => TwilioService.chatClient);
  }

  clientShutdown() {
    TwilioService.chatClient?.shutdown();
    TwilioService.chatClient = null;
  }

  addTokenListener(getToken) {
    if (!TwilioService.chatClient) {
      throw new Error('Twilio client is null or undefined');
    }
    TwilioService.chatClient.on('tokenAboutToExpire', () => {
      getToken().then(TwilioService.chatClient.updateToken);
    });

    TwilioService.chatClient.on('tokenExpired', () => {
      getToken().then(TwilioService.chatClient.updateToken);
    });
    return TwilioService.chatClient;
  }

  parseChannels(channels) {
    return channels.map(this.parseChannel);
  }

  parseChannel(channel) {
    return {
      id: channel.sid,
      name: channel.friendlyName,
      createdAt: channel.dateCreated,
      updatedAt: channel.dateUpdated,
      lastMessageTime: channel.lastMessage?.dateCreated ?? channel.dateUpdated ?? channel.dateCreated,
    };
  }

  parseMessages(messages) {
    return messages.map(this.parseMessage).reverse();
  }

  parseMessage(message) {
    return {
      _id: message.sid,
      text: message.body,
      createdAt: message.dateCreated,
      user: {
        _id: message.author,
        name: message.author,
      },
      received: true,
    };
  }
}