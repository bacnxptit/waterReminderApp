import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import CalendarView from './component/CalendarView';
import Header from '@/components/container/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {UserContext} from '@/context/UserAuthContext';
import WaterIntakeHistoryToday from '../homepage/component/WaterIntakeHistoryToday';
import {filterTodayIntakeHistory} from '../homepage/util';
import {ScreenDimension} from '@/constants/Dimensions';
import {formatedCurrentDate} from '@/util/SiteUtil';
import {transformDataInto} from './util';

const HistoryScreen = () => {
  const insets = useSafeAreaInsets();
  const {userWaterIntakeHistory, handleHistoryDelete, userInfo} =
    useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(formatedCurrentDate());

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: '#F5F5F5',
      }}>
      <View>
        <View>
          <Header
            containerStyling={{
              backgroundColor: '#fff',
              paddingHorizontal: 20,
            }}
            title={'History'}
          />
        </View>
        <View style={{flex: 1}}>
          <CalendarView
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            totalDayIntake={userInfo?.dailyGoal.value || 0}
            waterIntakeHistory={transformDataInto(userWaterIntakeHistory)}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: ScreenDimension.windowHeight / 5,
            zIndex: -1,
            padding: 20,
            marginBottom: 70,
          }}>
          <View
            style={{
              marginBottom: 60,
            }}>
            <WaterIntakeHistoryToday
              todayHistoryList={filterTodayIntakeHistory(
                userWaterIntakeHistory,
                selectedDate,
              )}
              title={
                selectedDate === formatedCurrentDate()
                  ? 'Today'
                  : `${selectedDate}`
              }
              hideLink
              noDataText="You have no history of data intake"
              handleHistoryDelete={handleHistoryDelete}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({});
