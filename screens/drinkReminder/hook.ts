import {useContext, useEffect, useState} from 'react';
import * as Notifications from 'expo-notifications';
import {ToastAndroid} from 'react-native';
import {requestPermissionNotificationReminder, startReminder} from './util';
import {UserContext} from '@/context/UserAuthContext';

export const useDrinkReminder = () => {
  const [isReminderActive, setIsReminderActive] = useState(false);
  const {userInfo} = useContext(UserContext);

  // Request notification permissions on load
  useEffect(() => {
    requestPermissionNotificationReminder().then(({status}) => {
      if (status !== 'granted') {
        alert('Permission for notifications is required to set reminders.');
      }
    });
  }, []);

  useEffect(() => {
    getAllnoti();
  }, []);

  const getAllnoti = async () => {
    const not = await Notifications.getAllScheduledNotificationsAsync();
    setIsReminderActive(not.length > 0);
  };

  const toggleReminder = async () => {
    if (isReminderActive) {
      await Notifications.cancelAllScheduledNotificationsAsync();
      ToastAndroid.show('Reminder is paused', 3000);
    } else {
      scheduleReminder();
    }
    setIsReminderActive(!isReminderActive);
  };

  const scheduleReminder = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  // TEST = 1 phút thay vì lấy từ userInfo
  const interval = 1; // <= gửi mỗi 1 phút

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Drink Water Reminder 💧",
      body: "Time to drink water!",
      sound: true,
      priority: 'high',
    },
    trigger: {
      seconds: interval * 60, // 1 phút = 60 giây
      repeats: true,
    }
  });

  ToastAndroid.show(`Reminder set every 1 minute`, 3000);
};


  return {
    isReminderActive,
    toggleReminder,
  };
};
