import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import {FontContext} from '@/context/FontThemeContext';
import {GenderType} from '@/storage/userinfo/type';
import {ButtonTheme} from '@/style/ButtonTheme';
import {COLOR_THEME} from '@/style/ColorTheme';
import Icon from '@expo/vector-icons/FontAwesome';

type GenderFormProps = {
  initialValue?: GenderType;
  updateGender: (gender: string) => void;
};
const GenderForm = ({initialValue, updateGender}: GenderFormProps) => {
  const {textTheme} = useContext(FontContext);
  const [gender, setGender] = useState(initialValue || 'male');
  return (
    <View style={[styles.container]}>
      <View style={{flex: 1}}>
        <View style={styles.form}>
          <Text style={[textTheme.heading3, styles.title]}>
            What's Your Gender
          </Text>
          <Text style={[textTheme.subText, styles.title, {marginTop: 10}]}>
            Water Mate is here to tailor your hydration plan just for you! Let's
            kick things off bby getting to know you better.
          </Text>
          <View style={styles.genderButtonContainer}>
            <View>
              <TouchableOpacity
                onPress={() => setGender('male')}
                style={[
                  styles.genderButton,
                  {
                    backgroundColor:
                      gender === 'male' ? COLOR_THEME.base.primary : '#fff',
                  },
                ]}>
                <Icon
                  name="male"
                  color={gender === 'male' ? '#fff' : '#333'}
                  size={60}
                />
              </TouchableOpacity>
              <View style={{marginTop: 20}}>
                <Text
                  style={[
                    textTheme.subText,
                    {
                      textAlign: 'center',
                      color:
                        gender === 'male'
                          ? COLOR_THEME.base.primary
                          : '#888888',
                    },
                  ]}>
                  Male
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setGender('female')}
                style={[
                  styles.genderButton,
                  {
                    backgroundColor:
                      gender === 'female' ? COLOR_THEME.base.primary : '#fff',
                  },
                ]}>
                <Icon
                  name="female"
                  color={gender === 'female' ? '#fff' : '#333'}
                  size={60}
                />
              </TouchableOpacity>
              <View style={{marginTop: 20}}>
                <Text
                  style={[
                    textTheme.subText,
                    {
                      textAlign: 'center',
                      color:
                        gender === 'female'
                          ? COLOR_THEME.base.primary
                          : '#888888',
                    },
                  ]}>
                  Female
                </Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={[
                styles.notToSayButton,
                {
                  backgroundColor:
                    gender === 'preferNotToSay'
                      ? COLOR_THEME.base.primary
                      : '#fff',
                },
              ]}
              onPress={() => setGender('preferNotToSay')}>
              <Text
                style={[
                  textTheme.subText,
                  {
                    color: gender === 'preferNotToSay' ? '#fff' : '#333',
                  },
                ]}>
                Prefer Not to Say
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.actionButton}>
          <TouchableOpacity
            onPress={() => {
              updateGender(gender);
            }}
            style={[ButtonTheme.containedButton, {width: '90%'}]}>
            <Text style={textTheme.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GenderForm;

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
  genderButtonContainer: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center',
    marginTop: 30,
  },
  genderButton: {
    height: 120,
    width: 120,
    borderRadius: 120,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
  },
  notToSayButton: {
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 80,
    marginTop: 30,
    borderColor: '#ccc',
  },
});
