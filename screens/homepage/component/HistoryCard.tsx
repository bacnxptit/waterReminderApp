import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {IntakeHistoryType} from '@/storage/userinfo/type';
import {
  ByDefaultCupsOptions,
  ByDrinikingOptions,
} from '@/constants/OptionConstant';

type HistoryCardProps = {
  intakeInfo: IntakeHistoryType;
  textTheme: any;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  handleHistoryDelete: (id: string) => void;
};

const HistoryCard = ({
  intakeInfo,
  textTheme,
  openMenuId,
  setOpenMenuId,
  handleHistoryDelete,
}: HistoryCardProps) => {
  const isMenuOpen = openMenuId === intakeInfo.id;

  const handleMenuToggle = () => {
    setOpenMenuId(isMenuOpen ? null : intakeInfo.id);
  };

  const findCupData = [...ByDefaultCupsOptions, ...ByDrinikingOptions].find(
    item => item.id === intakeInfo.defaultCupId,
  );

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={findCupData?.icon} style={{height: 40, width: 40}} />
        <View>
          <Text style={[textTheme.subText, {fontSize: 18, color: '#333'}]}>
            {intakeInfo.drinkType}
          </Text>
          <Text>{intakeInfo.time}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <View>
          <Text style={[textTheme.subText, {fontSize: 18, color: '#333'}]}>
            {intakeInfo.amount} ml
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleMenuToggle}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      {isMenuOpen && (
        <View style={styles.menuModal}>
          {/* <TouchableOpacity onPress={() => setOpenMenuId(null)}>
            <Text style={[textTheme.subText, {fontSize: 20, color: '#333'}]}>
              <MaterialCommunityIcons name="pencil" size={20} /> Edit
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              //   borderTopWidth: 1,
              //   borderTopColor: '#efefef',
              paddingTop: 10,
            }}
            onPress={() => {
              handleHistoryDelete(intakeInfo.id);
              setOpenMenuId(null);
            }}>
            <Text style={[textTheme.subText, {fontSize: 20, color: '#EA6230'}]}>
              <MaterialCommunityIcons name="trash-can" size={20} /> Delete
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#efefef',
    paddingBottom: 20,
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    gap: 10,
  },
  rightSection: {
    flexDirection: 'row',
    gap: 10,
  },
  menuModal: {
    position: 'absolute',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#333',
    minWidth: 120,
    borderRadius: 10,
    right: 30,
    zIndex: 999,
    backfaceVisibility: 'hidden',
  },
});
