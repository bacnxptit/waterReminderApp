import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import WaterDrop from './WaterDrop';
import {COLOR_THEME} from '@/style/ColorTheme';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {FontContext} from '@/context/FontThemeContext';
import {DailyGoalType, TodayIntakeType} from '@/storage/userinfo/type';
import {ButtonTheme} from '@/style/ButtonTheme';
import {ByDefaultCupsOptionsType} from '../type';
import {EvilIcons} from '@expo/vector-icons';
import SwitchCupSIzeModal from './SwitchCupSIzeModal';
import {formatedCurrentDate} from '@/util/SiteUtil';

type WaterIntakeTrackerProps = {
  totalIntack: DailyGoalType;
  todayIntack: TodayIntakeType;
  updateTodayDrinkingTrack: (capacity: TodayIntakeType) => void;
  defaultSelectedCup: ByDefaultCupsOptionsType;
  handleUpdateSelectCup: (selectedCup: ByDefaultCupsOptionsType) => void;
};
const WaterIntakeTracker = ({
  totalIntack,
  todayIntack,
  updateTodayDrinkingTrack,
  defaultSelectedCup,
  handleUpdateSelectCup,
}: WaterIntakeTrackerProps) => {
  const {textTheme} = useContext(FontContext);
  const [openSelectCupSizeModal, setOpenSelectCupSizeModal] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <AnimatedCircularProgress
          size={280}
          width={15}
          fill={(todayIntack.value / totalIntack.value) * 100}
          rotation={210}
          arcSweepAngle={300}
          tintColor={COLOR_THEME.base.primary}
          backgroundColor="#efefef">
          {fill => (
            <AnimatedCircularProgress
              size={220}
              width={15}
              fill={0}
              rotation={210}
              dashedBackground={{
                width: 1,
                gap: 40,
              }}
              arcSweepAngle={300}
              style={{
                borderRadius: 50,
                display: 'flex',
              }}
              tintColor={'#efefef'}
              backgroundColor="#ccc">
              {() => <WaterDrop value={fill} />}
            </AnimatedCircularProgress>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={{position: 'relative', bottom: 50}}>
        <Text
          style={[
            textTheme.heading1,
            {
              textAlign: 'center',
            },
          ]}>
          {todayIntack.value}
        </Text>
        <Text
          style={[
            textTheme.subText,
            {
              textAlign: 'center',
            },
          ]}>
          /{totalIntack.value} {totalIntack.type}
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() =>
            updateTodayDrinkingTrack({
              date: formatedCurrentDate(),
              value: defaultSelectedCup.value,
            })
          }
          style={[ButtonTheme.containedButton, {width: 'auto'}, ,]}>
          <Text style={textTheme.buttonText}>
            Drink({defaultSelectedCup.title})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOpenSelectCupSizeModal(true)}
          style={styles.cupButtonContainer}>
          <Image
            resizeMode="contain"
            source={defaultSelectedCup.icon}
            style={{
              height: 40,
              width: 40,
            }}
          />
          <View style={styles.refreshIcon}>
            <EvilIcons size={16} name="refresh" />
          </View>
        </TouchableOpacity>
      </View>
      <SwitchCupSIzeModal
        selectedCupSizeId={defaultSelectedCup.id}
        handleClose={() => setOpenSelectCupSizeModal(false)}
        openModal={openSelectCupSizeModal}
        handleUpdateSelectCup={cupDetail => {
          handleUpdateSelectCup(cupDetail);
          setOpenSelectCupSizeModal(false);
        }}
      />
    </View>
  );
};

export default WaterIntakeTracker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    bottom: 30,
    gap: 20,
  },
  cupButtonContainer: {
    height: 50,
    width: 50,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    position: 'relative',
  },
  refreshIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 18,
    width: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 60,
  },
});
