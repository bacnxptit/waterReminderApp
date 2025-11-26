import * as Notifications from 'expo-notifications';

export const startReminder = async (intervalMinutes: number = 120) => {
  const seconds = intervalMinutes * 60;
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time to Drink Water!',
      body: `Stay hydrated! It's time for a water break.`,
      sound: true,
      vibrate: [2],
    },
    trigger: {
      seconds: seconds,
      repeats: true,
    },
  });
  return;
};

export const requestPermissionNotificationReminder = async () => {
  const {status} = await Notifications.requestPermissionsAsync();
  return {
    status,
  };
};
