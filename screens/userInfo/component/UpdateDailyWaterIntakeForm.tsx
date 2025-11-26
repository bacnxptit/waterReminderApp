import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import {FontContext} from '@/context/FontThemeContext';
import Modal from 'react-native-modal';
import {ScreenDimension} from '@/constants/Dimensions';
import CommonTextInput from '@/components/field/CommonTextInput';
import {ButtonTheme} from '@/style/ButtonTheme';
import {COLOR_THEME} from '@/style/ColorTheme';
import {DailyGoalType} from '@/storage/userinfo/type';

type UpdateDailyWaterIntakeFormProps = {
  handleClose: () => void;
  initialValue: DailyGoalType;
  openModal: boolean;
  updateDailyIntake: (value: DailyGoalType) => void;
};
const UpdateDailyWaterIntakeForm = ({
  handleClose,
  openModal,
  initialValue,
  updateDailyIntake,
}: UpdateDailyWaterIntakeFormProps) => {
  const {textTheme} = useContext(FontContext);
  // callbacks
  const [newAmount, setNewAmount] = useState<string>(
    initialValue.value.toString() || '0',
  );

  return (
    <Modal
      isVisible={openModal}
      onBackdropPress={() => handleClose()}
      onBackButtonPress={() => handleClose()}
      swipeDirection="down"
      onSwipeComplete={handleClose}
      animationIn="bounceInUp"
      animationOut="bounceOutDown"
      animationInTiming={900}
      animationOutTiming={500}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}>
      <View
        style={{
          height: ScreenDimension.windowHeight / 2,
          backgroundColor: '#efefef',
        }}>
        <View style={[styles.container]}>
          <View style={styles.form}>
            <View
              style={{
                paddingVertical: 30,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                marginBottom: 30,
              }}>
              <Text style={[textTheme.heading3, {textAlign: 'center'}]}>
                Update Water Intake
              </Text>
            </View>

            <CommonTextInput
              handleChangeText={setNewAmount}
              value={newAmount}
              endAdorment="Ml"
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.actionButton}>
            <TouchableOpacity
              onPress={handleClose}
              style={[ButtonTheme.outlinedButton, {width: '45%'}]}>
              <Text
                style={[
                  textTheme.buttonText,
                  {color: COLOR_THEME.base.primary},
                ]}>
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                updateDailyIntake({
                  type: 'ml',
                  value: Number(newAmount),
                });
              }}
              style={[ButtonTheme.containedButton, {width: '45%'}]}>
              <Text style={textTheme.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateDailyWaterIntakeForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    gap: 10,
    justifyContent: 'center',

    paddingTop: 20,
    borderTopColor: '#ccc',
  },
  form: {
    flex: 4,
    paddingHorizontal: 20,
  },
});
