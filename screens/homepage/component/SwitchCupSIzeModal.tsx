import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {ScreenDimension} from '@/constants/Dimensions';
import Modal from 'react-native-modal';
import {Fontisto} from '@expo/vector-icons';
import {FontContext} from '@/context/FontThemeContext';
import {
  ByDefaultCupsOptions,
  ByDrinikingOptions,
} from '@/constants/OptionConstant';
import {FlatGrid} from 'react-native-super-grid';
import {ByDefaultCupsOptionsType} from '../type';
import UpdateDrinkModalForm from './UpdateDrinkModalForm';

type SwitchCupSIzeModalProps = {
  openModal: boolean;
  handleClose: () => void;
  selectedCupSizeId: number;
  handleUpdateSelectCup: (selectedCup: ByDefaultCupsOptionsType) => void;
};
const SwitchCupSIzeModal = ({
  openModal,
  handleClose,
  selectedCupSizeId,
  handleUpdateSelectCup,
}: SwitchCupSIzeModalProps) => {
  const {textTheme} = useContext(FontContext);
  const [selectedDrink, setSelectedDrink] =
    useState<ByDefaultCupsOptionsType | null>(null);
  return (
    <Modal
      isVisible={openModal}
      onBackButtonPress={() => handleClose()}
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
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={handleClose} style={styles.icon}>
            <Fontisto name={'close-a'} size={20} />
          </TouchableOpacity>
          <Text
            style={[textTheme.heading3, {width: '100%', textAlign: 'center'}]}>
            Switch Cup Size
          </Text>
        </View>
        <View style={styles.deafultCupContainer}>
          <FlatGrid
            itemDimension={80}
            data={ByDefaultCupsOptions}
            style={styles.gridView}
            spacing={10}
            renderItem={({item}) => (
              <View style={styles.itemContainer} key={item.id}>
                <TouchableOpacity
                  onPress={() => {
                    handleUpdateSelectCup(item);
                  }}
                  style={[
                    styles.cupButtonContainer,
                    {
                      backgroundColor:
                        selectedCupSizeId === item.id ? '#EEF7FF' : '#fff',
                    },
                  ]}>
                  <Image
                    resizeMode="contain"
                    source={item.icon}
                    style={{
                      height: 40,
                      width: 40,
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    textTheme.subText,
                    {textAlign: 'center', color: '#333', marginTop: 10},
                  ]}>
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={styles.deafultCupContainer}>
          <FlatGrid
            itemDimension={80}
            data={ByDrinikingOptions}
            style={styles.gridView}
            spacing={10}
            renderItem={({item}) => (
              <View style={styles.itemContainer} key={item.id}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDrink(item);
                  }}
                  style={[
                    styles.cupButtonContainer,
                    {
                      backgroundColor:
                        selectedCupSizeId === item.id ? '#EEF7FF' : '#fff',
                    },
                  ]}>
                  <Image
                    resizeMode="contain"
                    source={item.icon}
                    style={{
                      height: 40,
                      width: 40,
                    }}
                  />
                </TouchableOpacity>
                <Text
                  numberOfLines={1}
                  style={[
                    textTheme.subText,
                    {textAlign: 'center', color: '#333', marginTop: 10},
                  ]}>
                  {item.title}
                </Text>
              </View>
            )}
          />
          {selectedDrink && (
            <UpdateDrinkModalForm
              handleClose={() => setSelectedDrink(null)}
              drinkInfo={selectedDrink}
              openModal={!!selectedDrink}
              updateCapacityIntake={value => {
                handleUpdateSelectCup({
                  ...selectedDrink,
                  value: Number(value),
                });
                setSelectedDrink(null);
              }}
            />
          )}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default SwitchCupSIzeModal;

const styles = StyleSheet.create({
  container: {
    height: ScreenDimension.windowHeight,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 5,
  },
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'space-between',
    position: 'relative',
    width: ScreenDimension.windowWidth,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  icon: {
    position: 'absolute',
    left: 10,
    zIndex: 999,
  },
  cupButtonContainer: {
    height: 65,
    width: 65,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#efefef',
    borderWidth: 1,
    position: 'relative',
  },
  deafultCupContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
