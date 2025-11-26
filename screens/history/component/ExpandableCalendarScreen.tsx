import React, {useCallback, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  ExpandableCalendar,
  CalendarProvider,
  DateData,
} from 'react-native-calendars';
import {getTheme, lightThemeColor, themeColor} from '../mock/theme';
import {formatedCurrentDate} from '@/util/SiteUtil';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {COLOR_THEME} from '@/style/ColorTheme';
import {CalendarHistoryType} from '@/storage/userinfo/type';

const leftArrowIcon = require('@/assets/images/previous.png');
const rightArrowIcon = require('@/assets/images/next.png');

interface Props {
  width: number;
  setSelectedDate: (date: string) => void;
  selectedDate: string;
  waterIntakeHistory: CalendarHistoryType[];
  totalDayIntake: number;
}

const ExpandableCalendarScreen = (props: Props) => {
  const {
    width,
    setSelectedDate,
    totalDayIntake,
    waterIntakeHistory,
    selectedDate,
  } = props;
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });

  const renderView = useCallback(
    (date?: string & DateData) => {
      const amount =
        waterIntakeHistory.find(item => item.date === date?.dateString)
          ?.totalAmount || 0;

      return (
        <TouchableOpacity
          style={{
            padding: 5,
            borderRadius: 5,
            backgroundColor:
              selectedDate === date?.dateString ? '#EEF7FF' : '#fff',
          }}
          onPress={() => {
            date && setSelectedDate(date.dateString);
          }}>
          <AnimatedCircularProgress
            size={30}
            width={3}
            fill={(amount / totalDayIntake) * 100}
            rotation={210}
            tintColor={COLOR_THEME.base.primary}
            backgroundColor={'#efefef'}>
            {() => <Text>{date?.day}</Text>}
          </AnimatedCircularProgress>
        </TouchableOpacity>
      );
    },
    [selectedDate],
  );
  return (
    <CalendarProvider
      date={selectedDate}
      showTodayButton
      todayBottomMargin={5}
      onDateChanged={(date, updateSource) => {
        if (updateSource === 'todayPress') {
          setSelectedDate(date);
        }
      }}
      theme={todayBtnTheme.current}>
      <ExpandableCalendar
        calendarWidth={width}
        dayComponent={({date}) => renderView(date)}
        disableAllTouchEventsForDisabledDays
        maxDate={formatedCurrentDate()}
        allowShadow
        theme={theme.current}
        firstDay={1}
        leftArrowImageSource={leftArrowIcon}
        rightArrowImageSource={rightArrowIcon}
      />
    </CalendarProvider>
  );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: 'lightgrey',
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
  },
});
