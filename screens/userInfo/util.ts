import {
  ActivityLevelType,
  ClimateType,
  GenderType,
} from '@/storage/userinfo/type';
import {ActivityOptionType, ClimateOptionType} from './type';

export const ActivityLevelOptions: ActivityOptionType[] = [
  {
    icon: require('@/assets/images/activity/lazy.png'),
    title: 'Sedentry',
    description: 'Limited physical activity mostly sitting or lying down',
    id: 'sendatry',
  },
  {
    icon: require('@/assets/images/activity/walking.png'),
    title: 'Light Activity',
    description:
      'Some movement throughput the day. Such as light walking or ocassional standing.',
    id: 'light_activity',
  },
  {
    icon: require('@/assets/images/activity/running.png'),
    title: 'Moderate Activity',
    description:
      'Regular exercise or physical activity, such as jogging or cycling.',
    id: 'moderate_activity',
  },
  {
    icon: require('@/assets/images/activity/lifting.png'),
    title: 'Very Active',
    description:
      'Intense physical activity or training, such as heavy lifting or high-intensity training',
    id: 'very_active',
  },
];

export const ClimateOptions: ClimateOptionType[] = [
  {
    icon: require('@/assets/images/climate/sun.png'),
    title: 'Hot',
    id: 'hot',
  },
  {
    icon: require('@/assets/images/climate/temperate.png'),
    title: 'Temperate',
    id: 'temperate',
  },
  {
    icon: require('@/assets/images/climate/cold.png'),
    title: 'Cold',
    id: 'cold',
  },
];

interface WaterIntakeInput {
  weight: number; // in kg
  height: number; // in cm
  age: number;
  gender: GenderType;
  activityLevel: ActivityLevelType;
  wakeUpTime: string; // 'HH:MM' format (24-hour)
  sleepTime: string; // 'HH:MM' format (24-hour)
  weather: ClimateType;
}

export const calculateWaterIntake = ({
  weight,
  height,
  age,
  gender,
  activityLevel,
  wakeUpTime,
  sleepTime,
  weather,
}: WaterIntakeInput): number => {
  // Base water requirement based on weight
  let waterIntake = weight * 0.035; // 35ml per kg of weight

  // Gender adjustment
  if (gender === 'male') {
    waterIntake += 0.5; // Men generally need more water
  } else if (gender === 'female') {
    waterIntake += 0.3; // Women need slightly less
  } else {
    waterIntake += 0.5;
  }

  // Height adjustment
  if (height > 175) {
    waterIntake += 0.3; // Taller people need more water
  } else if (height < 160) {
    waterIntake -= 0.2; // Shorter people need slightly less water
  }
  // Activity level adjustment
  switch (activityLevel) {
    case 'light_activity':
      waterIntake += 0.3;
      break;
    case 'moderate_activity':
      waterIntake += 0.5;
      break;
    case 'very_active':
      waterIntake += 1;
      break;
    case 'sendatry':
    default:
      break; // No change for sedentary
  }

  // Age adjustment
  if (age > 30 && age <= 55) {
    waterIntake -= 0.2;
  } else if (age > 55) {
    waterIntake -= 0.4;
  }

  // Weather adjustment
  switch (weather) {
    case 'hot':
      waterIntake += 0.7;
      break;
    case 'cold':
      waterIntake -= 0.3;
      break;
    case 'temperate':
    default:
      break; // No change for temperate weather
  }

  // Calculate total awake hours
  const wakeHour = parseInt(wakeUpTime.split(':')[0]);
  const sleepHour = parseInt(sleepTime.split(':')[0]);
  const totalAwakeHours =
    sleepHour > wakeHour ? sleepHour - wakeHour : 24 - wakeHour + sleepHour;

  // Adjust based on awake time
  if (totalAwakeHours > 16) {
    waterIntake += 0.5; // Increase water intake if awake more than 16 hours
  } else if (totalAwakeHours < 12) {
    waterIntake -= 0.3; // Decrease if awake less than 12 hours
  }

  // Ensure minimum water intake is at least 1 liter
  if (waterIntake < 1) {
    waterIntake = 1;
  }
  // Ensure minimum water intake is at least 1 liter
  if (waterIntake < 1) {
    waterIntake = 1;
  }

  // Convert from liters to milliliters
  const waterIntakeInMl = waterIntake * 1000;

  return Math.round(waterIntakeInMl); // Return result rounded to nearest milliliter
};
