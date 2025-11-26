import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import {FontContext} from '@/context/FontThemeContext';
import {ButtonTheme} from '@/style/ButtonTheme';
import CommonTextInput from '@/components/field/CommonTextInput';

type UserNameFormProps = {
  updateName: (name: string) => void;
  initialValue?: string;
};
const UserNameForm = ({updateName, initialValue}: UserNameFormProps) => {
  const {textTheme} = useContext(FontContext);
  const [name, setName] = useState(initialValue || '');
  return (
    <View style={[styles.container]}>
      <View style={{flex: 1}}>
        <View style={styles.form}>
          <Text style={[textTheme.heading3, styles.title]}>
            What Should We Call You?
          </Text>
          <Text style={[textTheme.subText, styles.title, {marginTop: 10}]}>
            Give us a name, and we’ll give you the power to stay hydrated!
            Personalize your experience and make it yours.
          </Text>
          <View style={{marginTop: 20}}>
            <CommonTextInput
              placeholder="Enter your name"
              handleChangeText={setName}
              placeholderTextColor={'#ccc'}
              value={name}
            />
          </View>
        </View>
        <View style={styles.actionButton}>
          <TouchableOpacity
            disabled={name === ''}
            onPress={() => {
              updateName(name);
            }}
            style={[
              ButtonTheme.containedButton,
              {width: '90%'},
              name === '' && ButtonTheme.disableButtom,
            ]}>
            <Text style={textTheme.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserNameForm;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 7,
    paddingHorizontal: 20,
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
  title: {
    textAlign: 'center',
  },
});
