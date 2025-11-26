import {COLOR_THEME} from '@/style/ColorTheme';
import {Platform} from 'react-native';
import {Theme} from 'react-native-calendars/src/types';

export const themeColor = COLOR_THEME.base.primary;
export const lightThemeColor = '#f2f7f7';

export function getTheme() {
  const disabledColor = 'grey';

  return {
    // arrows
    arrowColor: 'black',
    arrowStyle: {padding: 0},
    // knob
    expandableKnobColor: themeColor,
    // month
    monthTextColor: COLOR_THEME.base.primary,
    textMonthFontSize: 19,
    textMonthFontFamily: 'Poppins-Regular',
    textMonthFontWeight: 'bold' as const,
    // day names
    textSectionTitleColor: 'black',
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: 'Poppins-Regular',
    textDayHeaderFontWeight: 'normal' as const,
    // dates
    dayTextColor: themeColor,
    todayTextColor: '#af0078',
    textDayFontSize: 12,
    textDayFontFamily: 'Poppins-Regular',
    textDayFontWeight: '900' as const,
    textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
    // selected date
    selectedDayBackgroundColor: themeColor,
    selectedDayTextColor: 'white',
    // disabled date
    textDisabledColor: disabledColor,
    // dot (marked date)
    dotColor: themeColor,
    selectedDotColor: 'white',
    disabledDotColor: disabledColor,
    dotStyle: {marginTop: -2},
    stylesheet: {
      calendar: {
        main: {
          padding: 20,
          background: 'red',
        },
      },
    },
  } as Theme;
}
