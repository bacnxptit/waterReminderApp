import {OptionsType} from '@/components/container/type';
import {AntDesign} from '@expo/vector-icons';

export const TabOptions: OptionsType[] = [
  {
    label: '',
    value: 'bar',
    icon: <AntDesign name="barchart" size={20} />,
  },
  {
    label: '',
    value: 'line',
    icon: <AntDesign name="linechart" size={20} />,
  },
];

export const ReportTabOptions: OptionsType[] = [
  {
    label: 'Weekly',
    value: 'weekly',
  },
  {
    label: 'Monthly',
    value: 'monthly',
  },
  {
    label: 'Yearly',
    value: 'yearly',
  },
];
