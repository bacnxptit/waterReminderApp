import {StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import React, {useContext, useState} from 'react';
import ScreenContainer from '@/components/container/ScreenContainer';
import {AccountOptionList} from './util';
import {Entypo} from '@expo/vector-icons';
import {FontContext} from '@/context/FontThemeContext';
import {UserContext} from '@/context/UserAuthContext';
import {router} from 'expo-router';
import WakeupTimeForm from '../userInfo/component/WakeUpTimeForm';
import BedTimeForm from '../userInfo/component/BedTimeForm';
import NotificationIntervalForm from './component/NotificationIntervalForm';
import { DailyGoalType, TimeType, TodayIntakeType } from '@/storage/userinfo/type';
import { ByDefaultCupsOptionsType } from '../homepage/type';

const ProfileScreen = () => {
  const {textTheme} = useContext(FontContext);
  const {userInfo, updateUserInfo} = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingType, setEditingType] = useState<string | null>(null);

  const handleEditTime = (type: string | React.SetStateAction<null>) => {
    setEditingType(type);
    setModalVisible(true);
  };

  const handleSaveWakeUpTime = (time: string | TimeType | DailyGoalType | ByDefaultCupsOptionsType | TodayIntakeType) => {
    updateUserInfo(time, 'wakeUpTime');
    setModalVisible(false);
    setEditingType(null);
  };

  const handleSaveBedTime = (time: string | TimeType | DailyGoalType | ByDefaultCupsOptionsType | TodayIntakeType) => {
    updateUserInfo(time, 'sleepingTime');
    setModalVisible(false);
    setEditingType(null);
  };

 const handleSaveNotificationInterval = (interval: number) => {
  console.log('Saving interval:', interval); // Debug
  updateUserInfo(interval as any, 'notificationInterval');
  setModalVisible(false);
  setEditingType(null);
};

  const formatTime = (timeObj: TimeType | undefined) => {
    if (!timeObj) return 'Chưa đặt';
    const hour = parseInt(timeObj.hrs);
    const period = hour > 11 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${String(displayHour).padStart(2, '0')}:${timeObj.min} ${period}`;
  };

  const formatInterval = (minutes: number | undefined) => {
    if (!minutes) return '120 phút';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`;
    } else if (hours > 0) {
      return `${hours} giờ`;
    } else {
      return `${mins} phút`;
    }
  };

  return (
    <ScreenContainer headerTitle="Account">
      <View style={styles.container}>
        {AccountOptionList.map(item => (
          <TouchableOpacity
            onPress={() => {
              router.push('/(routes)/drinkReminder');
            }}
            key={item.value}
            style={styles.list}>
            <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
              <View>{item.icon}</View>
              <Text style={[textTheme.heading3, {fontSize: 18}]}>
                {item.label}
              </Text>
            </View>
            <View>
              <Entypo name={'chevron-right'} size={20} />
            </View>
          </TouchableOpacity>
        ))}

        {/* Thời gian thức dậy */}
        <TouchableOpacity
          onPress={() => handleEditTime('wakeUpTime')}
          style={styles.list}>
          <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
            <Text style={[textTheme.heading3, {fontSize: 16}]}>
              Thời gian thức dậy
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Text style={[textTheme.subText, {fontSize: 14}]}>
              {formatTime(userInfo?.wakeUpTime)}
            </Text>
            <Entypo name={'chevron-right'} size={20} />
          </View>
        </TouchableOpacity>

        {/* Thời gian đi ngủ */}
        <TouchableOpacity
          onPress={() => handleEditTime('bedTime')}
          style={styles.list}>
          <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
            <Text style={[textTheme.heading3, {fontSize: 16}]}>
              Thời gian đi ngủ
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Text style={[textTheme.subText, {fontSize: 14}]}>
              {formatTime(userInfo?.sleepingTime)}
            </Text>
            <Entypo name={'chevron-right'} size={20} />
          </View>
        </TouchableOpacity>

        {/* Khoảng thời gian thông báo */}
        <TouchableOpacity
          onPress={() => handleEditTime('notificationInterval')}
          style={styles.list}>
          <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
            <Text style={[textTheme.heading3, {fontSize: 16}]}>
              Khoảng thời gian thông báo
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Text style={[textTheme.subText, {fontSize: 14}]}>
              {formatInterval((userInfo as any)?.notificationInterval)}
            </Text>
            <Entypo name={'chevron-right'} size={20} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal để chỉnh sửa */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {editingType === 'wakeUpTime' && (
              <WakeupTimeForm
                initialValue={userInfo?.wakeUpTime}
                updateWakeUpTime={handleSaveWakeUpTime}
              />
            )}
            {editingType === 'bedTime' && (
              <BedTimeForm
                initialValue={userInfo?.sleepingTime}
                updateBedTime={handleSaveBedTime}
              />
            )}
            {editingType === 'notificationInterval' && (
              <NotificationIntervalForm
                initialValue={(userInfo as any)?.notificationInterval}
                updateNotificationInterval={handleSaveNotificationInterval}
              />
            )}
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 30,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
});
