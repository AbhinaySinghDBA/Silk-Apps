import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import { Platform } from 'react-native';
class Notifications {
  constructor() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        // console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        // console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: false,
        sound: false,
      },
    });

    PushNotification.createChannel(
      {
        channelId: 'silkApp', // (required)
        channelName: 'silkAppNotifications', // (required)
        channelDescription: 'Reminder for any tasks',
      },
      () => {},
    );

    PushNotification.getScheduledLocalNotifications(rn => {
      // console.log('SN --- ');
      // console.log('SN --- ', rn);
    });
  }

  schduleNotification(e,icon,date) {
    PushNotification.localNotificationSchedule({
      channelId: 'silkApp',
      title: 'Downloaded!',
      message: e,
      date,
    //   smallIcon:`https://img.icons8.com/material-rounded/256/link.png`||"ic_launcher_round"
      smallIcon:"ic_launcher_round"
    });
  }
}

export default new Notifications();