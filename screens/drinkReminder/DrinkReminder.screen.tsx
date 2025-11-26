import React from 'react';
import {View, Text, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import {COLOR_THEME} from '@/style/ColorTheme';
import {useDrinkReminder} from './hook';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FontAwesome} from '@expo/vector-icons';
import {router} from 'expo-router';

const DrinkReminder = () => {
  const {isReminderActive, toggleReminder} = useDrinkReminder();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 20,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          marginTop: 20,
        }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
          }}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name={'arrow-left'} size={20} />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View>
          <Text style={styles.header}>Drink Reminder</Text>
        </View>
      </View>

      {/* Reminder Switch */}
      <View style={styles.settingContainer}>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Reminder</Text>
          <Switch
            value={isReminderActive}
            onValueChange={toggleReminder}
            trackColor={{false: '#ccc', true: '#4CAF50'}}
            thumbColor={isReminderActive ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>
    </View>
  );
};

export default DrinkReminder;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOR_THEME.base.primary,
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  picker: {
    height: 50,
    width: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  settingContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 15,
    marginTop: 30,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  linkText: {
    fontSize: 16,
    color: '#333',
  },
  linkValue: {
    fontSize: 16,
    color: '#888',
  },
});
