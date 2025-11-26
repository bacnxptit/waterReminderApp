import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useContext} from 'react';
import {FontContext} from '@/context/FontThemeContext';
import Feather from '@expo/vector-icons/Feather';

type HeaderProps = {
  title: string;
  containerStyling?: StyleProp<ViewStyle>;
};
const Header = ({title, containerStyling}: HeaderProps) => {
  const {textTheme} = useContext(FontContext);
  return (
    <View style={[styles.container, containerStyling]}>
      <Image
        source={require('@/assets/images/icon.png')}
        resizeMode="stretch"
        style={{
          height: 40,
          width: 40,
        }}
      />
      <Text style={textTheme.heading3}>{title}</Text>
      <Feather name="more-vertical" size={24} color="black" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
