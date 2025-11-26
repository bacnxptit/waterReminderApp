import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useContext, useState} from 'react';
import {FontContext} from '@/context/FontThemeContext';
import {ClimateType} from '@/storage/userinfo/type';
import {ButtonTheme} from '@/style/ButtonTheme';
import {ClimateOptions} from '../util';
import CardComponent from '@/components/container/CardComponent';

type ClimateFormProps = {
  initialValue?: ClimateType;
  updateClimate: (value: ClimateType) => void;
};
const ClimateForm = ({initialValue, updateClimate}: ClimateFormProps) => {
  const {textTheme} = useContext(FontContext);
  const [activityLevel, setActivityLevel] = useState<ClimateType>(
    initialValue || 'temperate',
  );
  return (
    <View style={[styles.container]}>
      <View style={{flex: 1}}>
        <View style={styles.form}>
          <Text style={[textTheme.heading3, styles.title]}>
            What's the climate/weather like in your area?
          </Text>
          <Text style={[textTheme.subText, styles.title, {marginTop: 10}]}>
            External factors like weather can influence your hydration needs.
            Let us know the current climate in your area.
          </Text>
          <View style={{flex: 1, overflow: 'hidden', marginTop: 10}}>
            <FlatList
              data={ClimateOptions}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              decelerationRate="fast"
              renderItem={({item}) => (
                <CardComponent
                  key={item.id}
                  handleOptionSelect={() => setActivityLevel(item.id)}
                  icon={item.icon}
                  isSelected={item.id === activityLevel}
                  title={item.title}
                />
              )}
            />
          </View>
        </View>
        <View style={styles.actionButton}>
          <TouchableOpacity
            onPress={() => {
              updateClimate(activityLevel);
            }}
            style={[ButtonTheme.containedButton, {width: '90%'}]}>
            <Text style={textTheme.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ClimateForm;

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
