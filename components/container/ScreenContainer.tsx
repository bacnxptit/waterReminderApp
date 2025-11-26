import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from './Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type ScreenContainerProps = {
  children: React.ReactNode;
  headerTitle: string;
};
const ScreenContainer = ({children, headerTitle}: ScreenContainerProps) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
      }}>
      <View style={{flex: 1}}>
        <Header title={headerTitle} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({});
