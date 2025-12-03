import * as Notifications from 'expo-notifications';

export const startReminder = async (intervalMinutes: number = 30) => {
  // luôn cancel cái cũ để tránh trùng
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Drink Water Reminder 💧',
      body: "Time to drink water!",
      sound: true,
      priority: 'high',
    },
    trigger: {
      seconds: intervalMinutes * 60,
      repeats: true,
    },
  });
};

export const requestPermissionNotificationReminder = async () => {
  const {status} = await Notifications.requestPermissionsAsync();
  return { status };
};
