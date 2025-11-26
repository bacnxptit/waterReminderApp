import {ByDrinikingOptions} from '@/constants/OptionConstant';

export const getDrinkType = (id?: number) => {
  return ByDrinikingOptions.find(item => item.id === id)?.title || 'Water';
};
