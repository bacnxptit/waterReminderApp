import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppStatusType, IntakeHistoryType, UserInfoType} from './type';

export const getUserInfoFromAsyncStorage = async () => {
  const value = await AsyncStorage.getItem('water_mate_user_info');
  return value ? JSON.parse(value) : null;
};

export const getWaterIntakeHistoryFromAsyncStorage = async () => {
  const value = await AsyncStorage.getItem(
    'water_mate_user_water_intake_history',
  );
  return value ? JSON.parse(value) : null;
};

export const getAppStatusInfo = async () => {
  const value = await AsyncStorage.getItem('water_mate_app_status_info');
  return value ? JSON.parse(value) : null;
};

export const updateUserInfoFromAsynStorage = async (value: UserInfoType) => {
  AsyncStorage.setItem('water_mate_user_info', JSON.stringify(value));
};

export const updateUserWaterIntakeToHistoryFromAsynStorage = async (
  value: IntakeHistoryType[],
) => {
  AsyncStorage.setItem(
    'water_mate_user_water_intake_history',
    JSON.stringify(value),
  );
};

export const updateAppStatusInfoFromAsynStorage = async (
  value: AppStatusType,
) => {
  AsyncStorage.setItem('water_mate_app_status_info', JSON.stringify(value));
};
