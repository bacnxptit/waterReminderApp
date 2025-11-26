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
    const interval = (userInfo as any)?.notificationInterval ?? 120;
    startReminder(interval);
    const hours = Math.floor(interval / 60);
    const mins = interval % 60;
    const timeText = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    ToastAndroid.show(`Reminder set for every ${timeText}.`, 3000);
  };

  return {
    isReminderActive,
    toggleReminder,
  };
};
