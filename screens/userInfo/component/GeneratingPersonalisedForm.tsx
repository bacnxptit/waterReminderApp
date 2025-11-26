import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {FontContext} from '@/context/FontThemeContext';
import CircularProgressBar from '@/components/container/CircularProgressBar';
import {UserInfoType} from '@/storage/userinfo/type';
import {calculateWaterIntake} from '../util';

type GeneratingPersonalisedFormProps = {
  personalisedPlanDone: (waterIntake: number) => void;
  userInfo: UserInfoType | null;
};
const GeneratingPersonalisedForm = ({
  personalisedPlanDone,
  userInfo,
}: GeneratingPersonalisedFormProps) => {
  const {textTheme} = useContext(FontContext);

  if (!userInfo) {
    return (
      <View style={[styles.container]}>
        <View style={{flex: 1}}>
          <View style={styles.form}>
            <Text style={[textTheme.heading3, styles.title]}>
              Something Went wrong please go back and input the value
            </Text>
            <Text style={[textTheme.subText, styles.title, {marginTop: 10}]}>
              Sorry for inconvinence..
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.container]}>
      <View style={{flex: 1}}>
        <View style={styles.form}>
          <Text style={[textTheme.heading3, styles.title]}>
            Generating personalized hydration plan for you...
          </Text>
          <Text style={[textTheme.subText, styles.title, {marginTop: 10}]}>
            Please Wait..
          </Text>
          <View style={{marginTop: 40}}>
            <CircularProgressBar
              durationCompleted={() =>
                personalisedPlanDone(
                  calculateWaterIntake({
                    activityLevel: userInfo.activityLevel,
                    age: Number(userInfo.age),
                    gender: userInfo.gender,
                    height: Number(userInfo.height),
                    sleepTime: `${userInfo.sleepingTime.hrs}: ${userInfo.sleepingTime.min}`,
                    wakeUpTime: `${userInfo.wakeUpTime.hrs}: ${userInfo.wakeUpTime.min}`,
                    weather: userInfo.climate,
                    weight: Number(userInfo.weight),
                  }),
                )
              }
              duration={3}
              strokeWidth={6}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default GeneratingPersonalisedForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 7,
    marginTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
  },
});
