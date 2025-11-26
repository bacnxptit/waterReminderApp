import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import ExpandableCalendarScreen from './ExpandableCalendarScreen';
import {CalendarHistoryType} from '@/storage/userinfo/type';

type CalendarViewProps = {
  selectedDate: string;
  setSelectedDate: (selectedDate: string) => void;
  waterIntakeHistory: CalendarHistoryType[];
  totalDayIntake: number;
};
const CalendarView = ({
  selectedDate,
  totalDayIntake,
  waterIntakeHistory,
  setSelectedDate,
}: CalendarViewProps) => {
  const [width, setWidth] = useState<number>(0);
  return (
    <View onLayout={e => setWidth(e.nativeEvent.layout.width)}>
      <ExpandableCalendarScreen
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        key={width}
        width={width}
        waterIntakeHistory={waterIntakeHistory}
        totalDayIntake={totalDayIntake}
      />
    </View>
  );
};

export default CalendarView;

const styles = StyleSheet.create({});
