import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import {FontContext} from '@/context/FontThemeContext';
import {ButtonTheme} from '@/style/ButtonTheme';

type NotificationIntervalFormProps = {
  initialValue?: number;
  updateNotificationInterval: (interval: number) => void;
};

const NotificationIntervalForm = ({
  initialValue = 60,
  updateNotificationInterval,
}: NotificationIntervalFormProps) => {
  const {textTheme} = useContext(FontContext);
  const [selectedInterval, setSelectedInterval] = useState(initialValue);

  // Các tùy chọn khoảng thời gian (tính bằng phút)
  const intervalOptions = [
    {label: '30 phút', value: 30},
    {label: '1 giờ', value: 60},
    {label: '1.5 giờ', value: 90},
    {label: '2 giờ', value: 120},
    {label: '2.5 giờ', value: 150},
    {label: '3 giờ', value: 180},
    {label: '4 giờ', value: 240},
  ];

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.form}>
          <Text style={[textTheme.heading3, styles.title]}>
            Khoảng thời gian thông báo
          </Text>
          <Text style={[textTheme.subText, styles.title, {marginTop: 10}]}>
            Chọn khoảng thời gian giữa các lần nhắc nhở uống nước
          </Text>

          <ScrollView
            style={styles.optionsContainer}
            showsVerticalScrollIndicator={false}>
            {intervalOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setSelectedInterval(option.value)}
                style={[
                  styles.optionButton,
                  selectedInterval === option.value && styles.optionButtonSelected,
                ]}>
                <Text
                  style={[
                    styles.optionText,
                    selectedInterval === option.value && styles.optionTextSelected,
                  ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.actionButton}>
          <TouchableOpacity
            onPress={() => {
              updateNotificationInterval(selectedInterval);
            }}
            style={[ButtonTheme.containedButton, {width: '90%'}]}>
            <Text style={textTheme.buttonText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NotificationIntervalForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 7,
    paddingHorizontal: 20,
    paddingTop: 20,
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
  optionsContainer: {
    marginVertical: 30,
    flex: 1,
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  optionButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  optionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
});