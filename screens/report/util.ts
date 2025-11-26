import {IntakeHistoryType} from '@/storage/userinfo/type';
import {ChartDataType, ReportFilterType, YAxisType} from './type';
import {startOfWeek, format, parseISO, isSameWeek, isSameYear} from 'date-fns';

export const DrinkCompletionYAxis: YAxisType[] = [
  {
    label: '0%',
    value: '0',
  },
  {
    label: '20%',
    value: '20',
  },
  {
    label: '40%',
    value: '40',
  },
  {
    label: '60%',
    value: '60',
  },
  {
    label: '80%',
    value: '80',
  },
  {
    label: '100%',
    value: '100',
  },
];

const colorMap: Record<string, string> = {
  water: '#4A90E2', // Blue for water
  Water: '#4A90E2', // Blue for water
  Juice: '#F5A623', // Orange for juice
  Coffee: '#8B572A', // Brown for coffee
  Tea: '#D0021B', // Red for tea
  Beer: '#F8E71C', // Yellow for beer
  Soda: '#D0021B', // Red for soda
  Wine: '#BD10E0', // Purple for wine
  Carbon: '#FF6347', // Tomato red for carbonated drinks
  'Coconut Drink': '#FFE4B5', // Light beige for coconut drink
  'Sports Drink': '#32CD32', // Lime green for sports drinks
  Smoothie: '#FF69B4', // Pink for smoothies
  Chocolate: '#D2691E', // Chocolate brown
  Liquor: '#8A2BE2', // Blue-violet for liquor
};

export const transformToDonutChartData = (
  intakeHistory: IntakeHistoryType[],
) => {
  if (!intakeHistory || intakeHistory.length === 0) {
    return [];
  }

  // Count occurrences of each drinkType
  const drinkCountMap = intakeHistory.reduce((acc: any, item) => {
    const {drinkType} = item;
    acc[drinkType] = (acc[drinkType] || 0) + 1;
    return acc;
  }, {});

  // Total count of all drinks
  const totalCount = intakeHistory.length;

  // Transform to DonutChartType
  return Object.keys(drinkCountMap).map(drinkType => ({
    label: drinkType,
    value: Math.round((drinkCountMap[drinkType] / totalCount) * 100),
    color: colorMap[drinkType] || '#000000', // Fallback color if not in colorMap
  }));
};

export function getChartData(
  selectedFilter: ReportFilterType,
  userWaterIntakeHistory: IntakeHistoryType[],
): ChartDataType[] {
  if (!userWaterIntakeHistory) {
    return [];
  }
  const today = new Date();

  if (selectedFilter === 'weekly') {
    const weekStart = startOfWeek(today, {weekStartsOn: 1});
    const currentDay = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // Use 6 for Sunday

    // Initialize data for each day of the week up to the current day
    const weeklyData: ChartDataType[] = [];
    for (let i = 0; i <= currentDay; i++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + i);
      weeklyData.push({
        label: format(currentDate, 'EEE'),
        value: 0,
      });
    }

    // Calculate total intake for each day of the current week
    userWaterIntakeHistory.forEach(entry => {
      const entryDate = parseISO(entry.date);
      if (isSameWeek(entryDate, today, {weekStartsOn: 1})) {
        const dayIndex = entryDate.getDay() === 0 ? 6 : entryDate.getDay() - 1;
        if (weeklyData[dayIndex]) {
          weeklyData[dayIndex].value += parseInt(entry.amount, 10);
        }
      }
    });

    return weeklyData;
  }

  if (selectedFilter === 'monthly') {
    const currentMonth = new Date().getMonth() + 1;
    // Initialize data for each month of the year
    const monthlyData: ChartDataType[] = Array.from(
      {length: currentMonth},
      (_, i) => ({
        label: format(new Date(today.getFullYear(), i), 'MMM'),
        value: 0,
      }),
    );

    // Calculate total intake for each month
    userWaterIntakeHistory.forEach(entry => {
      const entryDate = parseISO(entry.date);
      if (isSameYear(entryDate, today)) {
        const monthIndex = entryDate.getMonth();
        monthlyData[monthIndex].value += parseInt(entry.amount, 10);
      }
    });

    return monthlyData;
  }

  if (selectedFilter === 'yearly') {
    // Initialize data for the current year and the past 5 years
    const yearlyData: ChartDataType[] = Array.from({length: 6}, (_, i) => {
      const year = today.getFullYear() - i;
      return {label: year.toString(), value: 0};
    });

    // Calculate total intake for each year
    userWaterIntakeHistory.forEach(entry => {
      const entryDate = parseISO(entry.date);
      const entryYear = entryDate.getFullYear();
      const yearIndex = today.getFullYear() - entryYear;
      if (yearIndex >= 0 && yearIndex < 6) {
        yearlyData[yearIndex].value += parseInt(entry.amount, 10);
      }
    });

    return yearlyData.reverse(); // Reverse to show oldest year first
  }

  return [];
}

export function calculateIntakePercentage(
  chartData: ChartDataType[],
  intakeShouldPerDay: number,
  selectedFilter: 'weekly' | 'monthly' | 'yearly',
): ChartDataType[] {
  // Get the total intake requirement based on the selected filter
  let totalIntakeRequirement = 0;

  switch (selectedFilter) {
    case 'weekly':
      totalIntakeRequirement = intakeShouldPerDay;
      break;
    case 'monthly':
      const daysInMonth = new Date().getDate();
      totalIntakeRequirement = intakeShouldPerDay * daysInMonth;
      break;
    case 'yearly':
      const daysInYear = isLeapYear(new Date()) ? 366 : 365;
      totalIntakeRequirement = intakeShouldPerDay * daysInYear;
      break;
  }

  // Calculate percentage for each data point
  return chartData.map(dataPoint => {
    const percentage = Math.round(
      (dataPoint.value / totalIntakeRequirement) * 100,
    );
    return {
      ...dataPoint,
      value: percentage,
    };
  });
}

// Helper function to determine if a year is a leap year
function isLeapYear(date: Date): boolean {
  const year = date.getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function generateYAxisValues(
  minValue: number,
  maxValue: number,
  axisValue: number,
) {
  const yAxisValues = [];
  const step = (maxValue - minValue) / (axisValue - 1);

  for (let i = 0; i < axisValue; i++) {
    const value = minValue + step * i;
    yAxisValues.push({
      label: `${(value / 1000).toFixed(0)}L`, // Customize the label format if needed
      value: `${(value / 1000).toFixed(0)}`,
    });
  }

  return yAxisValues;
}
