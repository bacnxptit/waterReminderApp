import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {
  ActivityLevelType,
  AppStatusType,
  ClimateType,
  DailyGoalType,
  GenderType,
  IntakeHistoryType,
  TimeType,
  TodayIntakeType,
  UserInfoType,
} from '../storage/userinfo/type';
import {
  getAppStatusInfo,
  getUserInfoFromAsyncStorage,
  getWaterIntakeHistoryFromAsyncStorage,
  updateAppStatusInfoFromAsynStorage,
  updateUserInfoFromAsynStorage,
  updateUserWaterIntakeToHistoryFromAsynStorage,
} from '@/storage/userinfo/util';
import {router} from 'expo-router';
import {ByDefaultCupsOptions} from '@/constants/OptionConstant';
import {ByDefaultCupsOptionsType} from '@/screens/homepage/type';
import {formatedCurrentDate} from '@/util/SiteUtil';
import {getDrinkType} from './util';
import {startReminder} from '@/screens/drinkReminder/util';
type UserContextType = {
  userInfo: UserInfoType | null;
  appStatus: AppStatusType | null;
  handleWalkthroughCompleted: () => void;
  handleUpdateProfileCompleted: () => void;
  handleHistoryDelete: (id: string) => void;
  userWaterIntakeHistory: IntakeHistoryType[];
  updateUserInfo: (
    value:
      | string
      | TimeType
      | ActivityLevelType
      | DailyGoalType
      | ByDefaultCupsOptionsType
      | TodayIntakeType
      | number,
    type: string,
  ) => void;
  loading: boolean;
};

export const UserContext = createContext<UserContextType>({
  userInfo: null,
  appStatus: null,
  handleWalkthroughCompleted: () => {},
  updateUserInfo: () => {},
  handleUpdateProfileCompleted: () => {},
  userWaterIntakeHistory: [],
  handleHistoryDelete: () => {},
  loading: false,
});
const UserAuthContext = ({children}: {children: ReactNode}) => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [appStatus, setAppStatus] = useState<AppStatusType | null>(null);
  const [loading, setLoading] = useState(true);
  const [userWaterIntakeHistory, setWaterIntakeHistory] = useState<
    IntakeHistoryType[]
  >([]);

  useEffect(() => {
    getUserInfoFromAsyncStorage().then((res: UserInfoType) => {
      setUserInfo(res);
      setTimeout(() => {
        handleUpdateTodayIntake(res?.todayIntak || 0);
      }, 300);
    });
    getWaterIntakeHistoryFromAsyncStorage().then(res => {
      setWaterIntakeHistory(res || []);
    });
    getAppStatusInfo().then(res => {
      setAppStatus(res);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });
  }, []);

  const handleUpdateProfileCompleted = () => {
    setAppStatus(() => {
      updateAppStatusInfoFromAsynStorage({
        userProfileCompleted: true,
        isWalkthroughDone: true,
        reminderActive: true,
      });
      return {
        userProfileCompleted: true,
        isWalkthroughDone: true,
        reminderActive: true,
      };
    });
    startReminder();
    router.replace('/(tabs)/');
  };

  const handleUpdateWaterTrackHistory = (intakeInfo: IntakeHistoryType) => {
    setWaterIntakeHistory(prev => {
      updateUserWaterIntakeToHistoryFromAsynStorage([...prev, intakeInfo]);
      return [...prev, intakeInfo];
    });
  };

  const handleUpdateTodayIntake = (newIntake: TodayIntakeType) => {
    if (newIntake.date !== formatedCurrentDate()) {
      setUserInfo(prev => {
        updateUserInfoFromAsynStorage({
          ...prev!,
          todayIntak: {
            date: formatedCurrentDate(),
            value: 0,
          },
        });
        return {
          ...prev!,
          todayIntak: {
            date: formatedCurrentDate(),
            value: 0,
          },
        };
      });
    }
  };

  const updateUserInfo = (
    value:
      | string
      | TimeType
      | ActivityLevelType
      | DailyGoalType
      | ByDefaultCupsOptionsType
      | TodayIntakeType
      | number,
    type: string,
  ) => {
    if (type === 'todayIntak') {
      handleUpdateWaterTrackHistory({
        amount: (value as TodayIntakeType).value.toString(),
        date: formatedCurrentDate(),
        drinkType: getDrinkType(userInfo?.byDefaultSelectedCup?.id),
        id: Math.random().toString(),
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        defaultCupId: userInfo?.byDefaultSelectedCup?.id || 4,
      });
      setUserInfo(prev => {
        updateUserInfoFromAsynStorage({
          ...prev!,
          todayIntak: {
            ...(value as TodayIntakeType),
            value: prev!.todayIntak.value + (value as TodayIntakeType).value,
          },
        });
        return {
          ...prev!,
          todayIntak: {
            ...(value as TodayIntakeType),
            value: prev!.todayIntak.value + (value as TodayIntakeType).value,
          },
        };
      });
    }
    if (type === 'name') {
      setUserInfo(prev => {
        updateUserInfoFromAsynStorage({
          ...prev!,
          name: value as string,
        });
        return {
          ...prev!,
          name: value as string,
        };
      });
    }
    if (type === 'gender') {
      setUserInfo(prev => {
        updateUserInfoFromAsynStorage({
          ...prev!,
          gender: value as GenderType,
        });
        return {
          ...prev!,
          gender: value as GenderType,
        };
      });
    }
    if (type === 'height') {
      setUserInfo(prev => {
        updateUserInfoFromAsynStorage({
          ...prev!,
          height: value as string,
        });
        return {
          ...prev!,
          height: value as string,
        };
      });
    }
    if (type === 'weight') {
      setUserInfo(prev => {
        updateUserInfoFromAsynStorage({
          ...prev!,
          weight: value as string,
        });
        return {
          ...prev!,
          weight: value as string,
        };
      });
    }
    if (type === 'age') {
      setUserInfo(prev => {
        updateUserInfoFromAsynStorage({
          ...prev!,
          age: value as string,
        });
        return {
          ...prev!,
          age: value as string,
        };
      });
    }
    if (type === 'wakeUpTime') {
      setUserInfo(prev => {
        updateUserInfoFromAsynStorage({
          ...prev!,
          wakeUpTime: value as TimeType,
        });
        return {
          ...prev!,
          wakeUpTime: value as TimeType,
        };
      });
    }
    if (type === 'sleepingTime') {
      setUserInfo(prev => {
        updateUserInfoFromAsynStorage({
          ...prev!,
          sleepingTime: value as TimeType,
        });
        return {
          ...prev!,
          sleepingTime: value as TimeType,
        };
      });
    }
    if (type === 'activityLevel') {
      setUserInfo(prev => {
        updateUserInfoFromAsynStorage({
          ...prev!,
          activityLevel: value as ActivityLevelType,
        });
        return {
          ...prev!,
          activityLevel: value as ActivityLevelType,
        };
      });
    }
    if (type === 'climate') {
      setUserInfo(prev => {
        updateUserInfoFromAsynStorage({
          ...prev!,
          climate: value as ClimateType,
        });
        return {
          ...prev!,
          climate: value as ClimateType,
        };
      });
    }
    if (type === 'dailyGoal') {
      setUserInfo(prev => {
        updateUserInfoFromAsynStorage({
          ...prev!,
          dailyGoal: value as DailyGoalType,
          byDefaultSelectedCup: ByDefaultCupsOptions[3],
        });
        return {
          ...prev!,
          dailyGoal: value as DailyGoalType,
          byDefaultSelectedCup: ByDefaultCupsOptions[3],
        };
      });
    }
    if (type === 'byDefaultSelectedCup') {
      setUserInfo(prev => {
        updateUserInfoFromAsynStorage({
          ...prev!,
          byDefaultSelectedCup: value as ByDefaultCupsOptionsType,
        });
        return {
          ...prev!,
          byDefaultSelectedCup: value as ByDefaultCupsOptionsType,
        };
      });
    }
    if (type === 'notificationInterval') {
    console.log('Updating notificationInterval:', value);
    setUserInfo(prev => {
      const updated = {
        ...prev!,
        notificationInterval: value as number,
      };
      console.log('Updated userInfo:', updated);
      updateUserInfoFromAsynStorage(updated);
      return updated;
    });
  }
  };
  const handleWalkthroughCompleted = () => {
    setAppStatus(prev => {
      updateAppStatusInfoFromAsynStorage({
        userProfileCompleted: prev?.userProfileCompleted || false,
        isWalkthroughDone: true,
        reminderActive: false,
      });
      return {
        userProfileCompleted: prev?.userProfileCompleted || false,
        isWalkthroughDone: true,
        reminderActive: false,
      };
    });
    router.replace('/(routes)/userInfo');
  };

  const handleHistoryDelete = (historyId: string) => {
    const findItem = userWaterIntakeHistory.find(item => item.id == historyId);
    setWaterIntakeHistory(prev => {
      updateUserWaterIntakeToHistoryFromAsynStorage(
        prev.filter(item => item.id !== historyId),
      );
      return prev.filter(item => item.id !== historyId);
    });
    if (findItem?.date === formatedCurrentDate()) {
      setUserInfo(prev => {
        prev &&
          updateUserInfoFromAsynStorage({
            ...prev!,
            todayIntak: {
              ...prev?.todayIntak,
              value: Math.max(
                0,
                Number(prev?.todayIntak.value) - Number(findItem.amount),
              ),
            },
          });
        return {
          ...prev!,
          todayIntak: {
            date: prev?.todayIntak.date || formatedCurrentDate(),
            value: Math.max(
              0,
              Number(prev?.todayIntak.value) - Number(findItem.amount),
            ),
          },
        };
      });
    }
  };
  return (
    <UserContext.Provider
      value={{
        userInfo: userInfo,
        appStatus: appStatus,
        handleWalkthroughCompleted,
        updateUserInfo: updateUserInfo,
        handleUpdateProfileCompleted,
        userWaterIntakeHistory,
        handleHistoryDelete,
        loading,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserAuthContext;
