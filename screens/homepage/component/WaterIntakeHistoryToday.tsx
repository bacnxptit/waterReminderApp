import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {FontContext} from '@/context/FontThemeContext';
import {IntakeHistoryType} from '@/storage/userinfo/type';
import HistoryCard from './HistoryCard';
import {Link} from 'expo-router';

type WaterIntakeHistoryTodayProps = {
  todayHistoryList: IntakeHistoryType[];
  handleHistoryDelete: (id: string) => void;
  title?: string;
  hideLink?: boolean;
  noDataText?: string;
};
const WaterIntakeHistoryToday = ({
  todayHistoryList,
  handleHistoryDelete,
  hideLink = false,
  title,
  noDataText,
}: WaterIntakeHistoryTodayProps) => {
  const {textTheme} = useContext(FontContext);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleOutsidePress = () => {
    setOpenMenuId(null);
  };
  const renderView = () => {
    if (todayHistoryList.length === 0) {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Image
              tintColor={'#EEF7FF'}
              source={require('@/assets/images/leaf.png')}
              style={{
                height: 100,
                width: 100,
                marginVertical: 30,
              }}
            />
          </View>

          <Text
            style={[
              textTheme.subText,
              {textAlign: 'center', marginBottom: 30},
            ]}>
            {noDataText || 'You have no history of water intake today'}
          </Text>
        </View>
      );
    }

    return (
      <View>
        {todayHistoryList.map(item => (
          <View key={item.id} style={{marginTop: 10}}>
            <HistoryCard
              handleHistoryDelete={handleHistoryDelete}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              textTheme={textTheme}
              intakeInfo={item}
            />
          </View>
        ))}
      </View>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={textTheme.heading3}>{title || 'History'}</Text>
          {!hideLink && (
            <Text style={textTheme.linkText}>
              <Link href={'/(tabs)/History'}>View All {'->'}</Link>
            </Text>
          )}
        </View>
        <View>{renderView()}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WaterIntakeHistoryToday;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});
