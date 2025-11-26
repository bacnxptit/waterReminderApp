import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';

export const usePreventCloseApp = (onBeforeCloseApp: any) => {
  const [backPressedCount, setBackPressedCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        if (onBeforeCloseApp) {
          onBeforeCloseApp(() => setBackPressedCount(2));
        } else {
          setBackPressedCount(pre => {
            if (pre === 0) {
              ToastAndroid.show('Press again to exit', 1000);
              setTimeout(() => setBackPressedCount(0), 1000);
            }
            return pre + 1;
          });
        }
        return true;
      });
      return sub.remove;
    }, [onBeforeCloseApp]),
  );

  useEffect(() => {
    if (backPressedCount === 2) {
      BackHandler.exitApp();
    }
  }, [backPressedCount]);

  return {
    closeApp: () => setBackPressedCount(2),
  };
};
