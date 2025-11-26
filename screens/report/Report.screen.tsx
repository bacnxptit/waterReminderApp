import {StyleSheet, View} from 'react-native';
import React, {useContext, useMemo, useState} from 'react';
import ScreenContainer from '@/components/container/ScreenContainer';
import ButtonTabOptions from '@/components/container/ButtonTabOptions';
import {ReportTabOptions} from '@/constants/TabOption';
import {
  calculateIntakePercentage,
  DrinkCompletionYAxis,
  generateYAxisValues,
  getChartData,
  transformToDonutChartData,
} from './util';
import ReportCardComponent from './component/ReportCardComponent';
import DrinkTypeCard from './component/DrinkTypeCard';
import {UserContext} from '@/context/UserAuthContext';
import {ReportFilterType} from './type';
import {maxBy, minBy} from 'lodash';
import {isLeapYear} from 'date-fns';
import {useIsFocused} from '@react-navigation/native';

const ReportScreen = () => {
  const {userWaterIntakeHistory, userInfo} = useContext(UserContext);
  const [selectedFilter, setSelectedFilter] =
    useState<ReportFilterType>('weekly');
  const isFocued = useIsFocused();
  const data = useMemo(() => {
    return getChartData(selectedFilter, userWaterIntakeHistory);
  }, [selectedFilter, isFocued]);

  const max = useMemo(() => {
    return maxBy(data, item => item.value)?.value || 0;
  }, [selectedFilter, isFocued]);

  const getYAxisValue = () => {
    if (selectedFilter === 'weekly') {
      return generateYAxisValues(0, max, 5);
    }
    if (selectedFilter === 'monthly') {
      const daysInMonth = new Date().getDate();
      return generateYAxisValues(0, userInfo!.dailyGoal.value * daysInMonth, 5);
    }

    const daysInYear = isLeapYear(new Date()) ? 366 : 365;
    return generateYAxisValues(0, userInfo!.dailyGoal.value * daysInYear, 5);
  };

  return (
    <ScreenContainer headerTitle="REPORT">
      <View style={{marginBottom: 30}}>
        <ButtonTabOptions
          options={ReportTabOptions}
          handleOptionSelect={value =>
            setSelectedFilter(value as ReportFilterType)
          }
          selectedOption={selectedFilter}
          type="secondary"
          buttonWidth={`${100 / 3}%`}
        />
      </View>
      <View>
        <ReportCardComponent
          data={calculateIntakePercentage(
            data,
            userInfo?.dailyGoal.value || 0,
            selectedFilter,
          )}
          key={selectedFilter}
          yAxis={DrinkCompletionYAxis}
          title="Drink Completion"
        />
      </View>
      <View style={{marginTop: 30}}>
        <ReportCardComponent
          data={data.map(item => ({
            ...item,
            value: item.value / 1000,
          }))}
          key={selectedFilter}
          yAxis={getYAxisValue()}
          title="Hydrate"
          labelType={'L'}
        />
      </View>
      <View style={{marginTop: 30, marginBottom: 30}}>
        <DrinkTypeCard
          data={transformToDonutChartData(userWaterIntakeHistory)}
          title="Drink Types"
        />
      </View>
    </ScreenContainer>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
