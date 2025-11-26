import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import {FontContext} from '@/context/FontThemeContext';
import {DailyGoalType, WaterLevelType} from '@/storage/userinfo/type';
import {ButtonTheme} from '@/style/ButtonTheme';
import ButtonTabOptions from '@/components/container/ButtonTabOptions';
import UpdateDailyWaterIntakeForm from './UpdateDailyWaterIntakeForm';
import {EvilIcons} from '@expo/vector-icons';

type DailyGoalFormProps = {
  initialValue?: DailyGoalType;
  updateDailyGoal: (dailyGoal: DailyGoalType) => void;
  submitAllInfo: () => void;
};

const DailyGoalForm = ({
  initialValue,
  submitAllInfo,
  updateDailyGoal,
}: DailyGoalFormProps) => {
  const {textTheme} = useContext(FontContext);
  const [dailyGoal, setDailyGoal] = useState<DailyGoalType>(
    initialValue || {
      type: 'ml',
      value: 0,
    },
  );
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  return (
    <View style={[styles.container]}>
      <View style={{flex: 1}}>
        <View style={styles.form}>
          <Text style={[textTheme.heading3, styles.title]}>
            Your Daily Goal is
          </Text>

          <View style={{marginTop: 30, overflow: 'hidden'}}>
            <View style={{marginBottom: 80}}>
              <ButtonTabOptions
                handleOptionSelect={type => {
                  setDailyGoal(prev => ({
                    ...prev,
                    type: type as WaterLevelType,
                  }));
                }}
                selectedOption={dailyGoal.type}
                options={[
                  {
                    label: 'ML',
                    value: 'ml',
                  },
                  {
                    label: 'L',
                    value: 'L',
                  },
                ]}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Image
                source={require('@/assets/images/glassOfWater.png')}
                resizeMethod="resize"
                resizeMode="contain"
                style={{
                  height: 100,
                  width: 100,
                }}
              />
            </View>
            <View>
              <Text
                style={[
                  textTheme.heading1,
                  {fontSize: 64, textAlign: 'center'},
                ]}>
                {dailyGoal.type === 'L'
                  ? dailyGoal.value / 1000
                  : dailyGoal.value}{' '}
                <Text style={[textTheme.subText, {fontSize: 32}]}>
                  {dailyGoal.type}
                </Text>
              </Text>
              <View style={styles.adjustButtonContainer}>
                <TouchableOpacity
                  style={styles.adjustButton}
                  onPress={() => setOpenUpdateModal(true)}>
                  <Text
                    style={[
                      textTheme.subText,
                      {
                        fontSize: 18,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      },
                    ]}>
                    <EvilIcons name="pencil" size={20} />
                    Adjust
                  </Text>
                </TouchableOpacity>
              </View>
              <UpdateDailyWaterIntakeForm
                openModal={openUpdateModal}
                handleClose={() => setOpenUpdateModal(false)}
                initialValue={
                  initialValue || {
                    type: 'ml',
                    value: 0,
                  }
                }
                updateDailyIntake={value => {
                  updateDailyGoal(value);
                  setDailyGoal(value);
                  setOpenUpdateModal(false);
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.actionButton}>
          <TouchableOpacity
            onPress={() => {
              submitAllInfo();
            }}
            style={[ButtonTheme.containedButton, {width: '90%'}]}>
            <Text style={textTheme.buttonText}>Let's Hydrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DailyGoalForm;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'grey',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 7,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    gap: 10,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 20,
    borderTopColor: '#ccc',
  },
  adjustButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  adjustButton: {
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 5,
    width: 'auto',
    marginTop: 5,
  },
});
