import {useContext, useEffect, useState} from 'react';
import * as Notifications from 'expo-notifications';
import {ToastAndroid} from 'react-native';
import {requestPermissionNotificationReminder, startReminder} from './util';
import {UserContext} from '@/context/UserAuthContext';

export type UserInfoType = {
  notificationInterval?: number;
};


export const useDrinkReminder = () => {
  const [isReminderActive, setIsReminderActive] = useState(false);
  const {userInfo} = useContext(UserContext);

  useEffect(() => {
    requestPermissionNotificationReminder().then(({status}) => {
      if (status !== 'granted') {
        alert('Permission for notifications is required to set reminders.');
      }
    });
  }, []);

  useEffect(() => {
    getAllNotifications();
  }, []);

  const getAllNotifications = async () => {
    const notis = await Notifications.getAllScheduledNotificationsAsync();
    setIsReminderActive(notis.length > 0);
  };

  const toggleReminder = async () => {
    if (isReminderActive) {
      await Notifications.cancelAllScheduledNotificationsAsync();
      ToastAndroid.show('Reminder is paused', 3000);
      setIsReminderActive(false);
    } else {
      const interval = userInfo?.notificationInterval ?? 30;

      await startReminder(interval);
      ToastAndroid.show(`Reminder set every ${interval} minute(s)`, 3000);
      setIsReminderActive(true);
    }
  };

  // Tự động update interval khi user thay đổi
  useEffect(() => {
    if (isReminderActive) {
      const interval = userInfo?.notificationInterval ?? 30;

      startReminder(interval);
    }
  }, [userInfo?.notificationInterval]);

  return {
    isReminderActive,
    toggleReminder,
  };
};
