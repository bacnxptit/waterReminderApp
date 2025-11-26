import {ByDefaultCupsOptionsType} from '@/screens/homepage/type';

export type GenderType = 'male' | 'female' | 'preferNotToSay';
export type TimeType = {
  hrs: string;
  min: string;
};

export type ActivityLevelType =
  | 'sendatry'
  | 'light_activity'
  | 'moderate_activity'
  | 'very_active';

export type WaterLevelType = 'ml' | 'L';
export type DailyGoalType = {
  value: number;
  type: WaterLevelType;
};
export type ClimateType = 'hot' | 'temperate' | 'cold';
export type TodayIntakeType = {
  value: number;
  date: string;
};

export type UserInfoType = {
  name?: string;
  gender?: GenderType;
  height?: string;
  weight?: string;
  age?: string;
  wakeUpTime?: TimeType;
  sleepingTime?: TimeType;
  activityLevel?: ActivityLevelType;
  climate?: ClimateType;
  dailyGoal?: DailyGoalType;
  byDefaultSelectedCup?: ByDefaultCupsOptionsType;
  todayIntak: TodayIntakeType;
  notificationInterval?: number; // Thêm dòng này
};

export type AppStatusType = {
  isWalkthroughDone: boolean;
  userProfileCompleted: boolean;
  reminderActive: boolean;
};

export type DrinkType =
  | 'water'
  | 'coffee'
  | 'tea'
  | 'juice'
  | 'sportDrink'
  | 'coconutDrink'
  | 'smoothie'
  | 'chocolate'
  | 'carbon'
  | 'soda'
  | 'wine'
  | 'beer'
  | 'liquor';

export type IntakeHistoryType = {
  drinkType: string;
  date: string;
  time: string;
  amount: string;
  id: string;
  defaultCupId: number;
};

export type CalendarHistoryType = {
  date: string;
  totalAmount: number;
};
