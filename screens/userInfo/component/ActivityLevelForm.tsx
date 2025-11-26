import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useContext, useState} from 'react';
import {FontContext} from '@/context/FontThemeContext';
import {ActivityLevelType, GenderType} from '@/storage/userinfo/type';
import {ButtonTheme} from '@/style/ButtonTheme';
import {COLOR_THEME} from '@/style/ColorTheme';
import Icon from '@expo/vector-icons/FontAwesome';
import {ActivityLevelOptions} from '../util';
import CardComponent from '@/components/container/CardComponent';

type ActivityLevelFormProps = {
  initialValue?: ActivityLevelType;
  updateActivityLevel: (value: ActivityLevelType) => void;
};
const ActivityLevelForm = ({
  initialValue,
  updateActivityLevel,
}: ActivityLevelFormProps) => {
  const {textTheme} = useContext(FontContext);
  const [activityLevel, setActivityLevel] = useState(
    initialValue || 'moderate_activity',
  );
  return (
    <View style={[styles.container]}>
      <View style={{flex: 1}}>
        <View style={styles.form}>
          <Text style={[textTheme.heading3, styles.title]}>
            What's Your Activity Level?
          </Text>
          <Text style={[textTheme.subText, styles.title, {marginTop: 10}]}>
            Understanding your activity is vital for crafting a personalized
            hydration plan. Pick the option that best described your typical
            activity level.
          </Text>
          <View style={{flex: 1, overflow: 'hidden', marginTop: 10}}>
            <FlatList
              data={ActivityLevelOptions}
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
                  description={item.description}
                />
              )}
            />
          </View>
        </View>
        <View style={styles.actionButton}>
          <TouchableOpacity
            onPress={() => {
              updateActivityLevel(activityLevel);
            }}
            style={[ButtonTheme.containedButton, {width: '90%'}]}>
            <Text style={textTheme.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ActivityLevelForm;

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
