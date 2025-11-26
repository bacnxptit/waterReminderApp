import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {ScreenDimension} from '@/constants/Dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontContext} from '@/context/FontThemeContext';
import BoardingView from './component/BoardingView';
import {ButtonTheme} from '@/style/ButtonTheme';
import {COLOR_THEME} from '@/style/ColorTheme';
import {UserContext} from '@/context/UserAuthContext';

const OnBoardingScreen = () => {
  const {textTheme} = useContext(FontContext);
  const [step, setStep] = useState(1);
  const {handleWalkthroughCompleted, appStatus} = useContext(UserContext);
  const renderView = () => {
    if (step === 1) {
      return (
        <BoardingView
          image={require('@/assets/images/appscreen/home.png')}
          step={1}
          key={step}
          subText="Stay healthy & conquer your hydration goals! Track your water
            intake, set reminders and unlock achievements for a healthier you."
          textTheme={textTheme}
          title="Water Mate: Your Ultimate Hydration Companion!"
        />
      );
    }
    if (step === 2) {
      return (
        <BoardingView
          image={require('@/assets/images/appscreen/calendar.png')}
          key={step}
          step={2}
          subText="Set reminders to stay consistent, review your daily hydration history and visualise your progress over time"
          textTheme={textTheme}
          title="Track Your Hydration & Visualize Your Progress"
        />
      );
    }
    return (
      <BoardingView
        image={require('@/assets/images/appscreen/report.png')}
        step={3}
        key={step}
        subText="Level up your hydration game with Water Mate's achievements. Make Water mate a lifelong habit."
        textTheme={textTheme}
        title="Achieve Your Hydration Goals with Water Mate Now"
      />
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>{renderView()}</View>
        <View style={styles.actionButton}>
          {step !== 3 && (
            <TouchableOpacity
              onPress={handleWalkthroughCompleted}
              style={[ButtonTheme.outlinedButton, {width: '45%'}]}>
              <Text
                style={[
                  textTheme.buttonText,
                  {color: COLOR_THEME.base.primary},
                ]}>
                Skip
              </Text>
            </TouchableOpacity>
          )}
          {step !== 3 && (
            <TouchableOpacity
              onPress={() => setStep(prev => prev + 1)}
              style={[ButtonTheme.containedButton, {width: '45%'}, ,]}>
              <Text style={textTheme.buttonText}>Continue</Text>
            </TouchableOpacity>
          )}
          {step === 3 && (
            <TouchableOpacity
              onPress={handleWalkthroughCompleted}
              style={[ButtonTheme.containedButton, {width: '90%'}, ,]}>
              <Text style={textTheme.buttonText}>Lets Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    height: ScreenDimension.windowHeight,
    backgroundColor: COLOR_THEME.base.primary,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    gap: 10,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 20,
    borderTopColor: '#efefef',
    backgroundColor: '#fdfdfd',
  },
});
