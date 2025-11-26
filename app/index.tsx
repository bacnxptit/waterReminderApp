import React, {useContext} from 'react';
import {Redirect} from 'expo-router';
import {UserContext} from '@/context/UserAuthContext';
import {View} from 'react-native';

const index = () => {
  const {appStatus, loading} = useContext(UserContext);

  if (loading) {
    return <View />;
  }
  if (!appStatus?.isWalkthroughDone) {
    return <Redirect href={'/(routes)/onBoarding'} />;
  }
  if (!appStatus?.userProfileCompleted) {
    return <Redirect href={'/(routes)/userInfo'} />;
  }
  return <Redirect href={'/(tabs)'} />;
};

export default index;
