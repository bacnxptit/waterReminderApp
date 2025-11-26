import {SafeAreaView, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Timeline from './component/Timeline';
import UserNameForm from './component/UserNameForm';
import GenderForm from './component/GenderForm';
import HeightForm from './component/HeightForm';
import WeightForm from './component/WeightForm';
import AgeForm from './component/AgeForm';
import WakeUpTimeForm from './component/WakeUpTimeForm';
import BedTimeForm from './component/BedTimeForm';
import ActivityLevelForm from './component/ActivityLevelForm';
import DailyGoalForm from './component/DailyGoalForm';
import {UserContext} from '@/context/UserAuthContext';
import ClimateForm from './component/ClimateForm';
import GeneratingPersonalisedForm from './component/GeneratingPersonalisedForm';

const UserInfoScreen = () => {
  const [step, setStep] = useState(1);
  const {updateUserInfo, handleUpdateProfileCompleted, userInfo} =
    useContext(UserContext);

  const renderProfileForm = () => {
    if (step === 1) {
      return (
        <UserNameForm
          initialValue={userInfo?.name}
          updateName={name => {
            updateUserInfo(name, 'name');
            setStep(2);
          }}
        />
      );
    }
    if (step === 2) {
      return (
        <GenderForm
          initialValue={userInfo?.gender}
          updateGender={gender => {
            updateUserInfo(gender, 'gender');
            setStep(3);
          }}
        />
      );
    }
    if (step === 3) {
      return (
        <HeightForm
          gender={userInfo?.gender}
          initialValue={userInfo?.height}
          updateHeight={height => {
            updateUserInfo(height, 'height');
            setStep(4);
          }}
        />
      );
    }
    if (step === 4) {
      return (
        <WeightForm
          gender={userInfo?.gender}
          initialValue={userInfo?.weight}
          updateWeight={weight => {
            updateUserInfo(weight, 'weight');
            setStep(5);
          }}
        />
      );
    }
    if (step === 5) {
      return (
        <AgeForm
          updateAge={age => {
            updateUserInfo(age, 'age');
            setStep(6);
          }}
          initialValue={userInfo?.age}
        />
      );
    }
    if (step === 6) {
      return (
        <WakeUpTimeForm
          updateWakeUpTime={wakeupTime => {
            updateUserInfo(wakeupTime, 'wakeUpTime');
            setStep(7);
          }}
          initialValue={userInfo?.wakeUpTime}
        />
      );
    }
    if (step === 7) {
      return (
        <BedTimeForm
          updateBedTime={sleepingTime => {
            updateUserInfo(sleepingTime, 'sleepingTime');
            setStep(8);
          }}
          initialValue={userInfo?.sleepingTime}
        />
      );
    }
    if (step === 8) {
      return (
        <ActivityLevelForm
          updateActivityLevel={activityLevel => {
            updateUserInfo(activityLevel, 'activityLevel');
            setStep(9);
          }}
          initialValue={userInfo?.activityLevel}
        />
      );
    }
    if (step === 9) {
      return (
        <ClimateForm
          updateClimate={climate => {
            updateUserInfo(climate, 'climate');
            setStep(10);
          }}
          initialValue={userInfo?.climate}
        />
      );
    }
    if (step === 10) {
      return (
        <GeneratingPersonalisedForm
          userInfo={userInfo}
          personalisedPlanDone={waterIntake => {
            updateUserInfo(
              {
                type: 'ml',
                value: waterIntake,
              },
              'dailyGoal',
            );
            setStep(11);
          }}
        />
      );
    }
    return (
      <DailyGoalForm
        initialValue={userInfo?.dailyGoal}
        submitAllInfo={() => {
          handleUpdateProfileCompleted();
        }}
        updateDailyGoal={dailyGoal => {
          updateUserInfo(dailyGoal, 'dailyGoal');
        }}
      />
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {step < 10 && (
        <View style={{flex: 1}}>
          <Timeline step={step} handleBack={() => setStep(prev => prev - 1)} />
        </View>
      )}

      <View key={step} style={{flex: 7, marginTop: 30}}>
        {renderProfileForm()}
      </View>
    </SafeAreaView>
  );
};

export default UserInfoScreen;
