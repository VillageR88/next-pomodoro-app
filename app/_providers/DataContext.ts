export enum SelectedMode {
  pomodoro = 'pomodoro',
  shortBreak = 'shortBreak',
  longBreak = 'longBreak',
}

export enum SelectedFont {
  kumbhSans = 'kumbhSans',
  robotoSlab = 'robotoSlab',
  spaceMono = 'spaceMono',
}

export enum SelectedTheme {
  redAlike = 'redAlike',
  blueAlike = 'blueAlike',
  purpleAlike = 'purpleAlike',
  // redAlike = '#F87070',
  // blueAlike = '#70F3F8',
  // purpleAlike = '#D881F8',
}

export const fontItems = {
  kumbhSans: { variable: 'font-kumbhSans', name: 'Kumbh Sans' },
  robotoSlab: { variable: 'font-robotoSlab', name: 'Roboto Slab' },
  spaceMono: { variable: 'font-spaceMono', name: 'Space Mono' },
};

export const themeItems = {
  redAlike: { background: 'bg-[#F87070]', stroke: 'stroke-[#F87070]' },
  blueAlike: { background: 'bg-[#70F3F8]', stroke: 'stroke-[#70F3F8]' },
  purpleAlike: { background: 'bg-[#D881F8]', stroke: 'stroke-[#D881F8]' },
};

const defaultValuePomodoro = 25;
const defaultValueShortBreak = 5;
const defaultValueLongBreak = 15;

export const settingsItems = {
  pomodoro: {
    label: 'pomodoro',
    defaultValue: defaultValuePomodoro,
  },
  shortBreak: {
    label: 'short break',
    defaultValue: defaultValueShortBreak,
  },
  longBreak: {
    label: 'long break',
    defaultValue: defaultValueLongBreak,
  },
};
