import {StyleSheet, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import ScreenContainer from '@/components/container/ScreenContainer';
import WaterIntakeTracker from './component/WaterIntakeTracker';
import {UserContext} from '@/context/UserAuthContext';
import {ByDefaultCupsOptions} from '@/constants/OptionConstant';
import {formatedCurrentDate} from '@/util/SiteUtil';
import WaterIntakeHistoryToday from './component/WaterIntakeHistoryToday';
import {filterTodayIntakeHistory} from './util';
import {requestPermissionNotificationReminder} from '../drinkReminder/util';

const HomeScreen = () => {
  const {
    userInfo,
    updateUserInfo,
    handleHistoryDelete,
    userWaterIntakeHistory,
  } = useContext(UserContext);

  useEffect(() => {
    requestPermissionNotificationReminder();
  }, []);

  return (
    <ScreenContainer headerTitle="Home">
      <View>
        <WaterIntakeTracker
          todayIntack={
            userInfo?.todayIntak || {
              date: formatedCurrentDate(),
              value: 0,
            }
          }
          totalIntack={
            userInfo?.dailyGoal || {
              type: 'ml',
              value: 0,
            }
          }
          handleUpdateSelectCup={cupDetail => {
            updateUserInfo(cupDetail, 'byDefaultSelectedCup');
          }}
          updateTodayDrinkingTrack={todayIntack =>
            updateUserInfo(todayIntack, 'todayIntak')
          }
          defaultSelectedCup={
            userInfo?.byDefaultSelectedCup || ByDefaultCupsOptions[3]
          }
        />
      </View>
      <View style={{marginVertical: 30}}>
        <WaterIntakeHistoryToday
          handleHistoryDelete={handleHistoryDelete}
          todayHistoryList={filterTodayIntakeHistory(
            userWaterIntakeHistory,
            formatedCurrentDate(),
          )}
        />
      </View>
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
