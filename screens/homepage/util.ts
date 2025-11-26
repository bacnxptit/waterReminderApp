import {IntakeHistoryType} from '@/storage/userinfo/type';

export const filterTodayIntakeHistory = (
  list: IntakeHistoryType[],
  date: string,
) => {
  if (!list) {
    return [];
  }
  return list.filter(item => item.date === date);
};
