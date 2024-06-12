'use client';
import { ReactNode, createContext, useState, Dispatch, SetStateAction, useRef, useEffect } from 'react';

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
}

export const fontItems = {
  kumbhSans: {
    variable: 'font-kumbhSans',
    name: 'Kumbh Sans',
    h1Class: 'text-[80px] font-bold tracking-[-4px] sm:text-[100px] sm:tracking-[-5px]',
  },
  robotoSlab: {
    variable: 'font-robotoSlab',
    name: 'Roboto Slab',
    h1Class: 'text-[80px] font-bold sm:text-[100px]',
  },
  spaceMono: {
    variable: 'font-spaceMono',
    name: 'Space Mono',
    h1Class: 'text-[80px] font-bold tracking-[-10px] sm:text-[100px]',
  },
};

export const themeItems = {
  redAlike: { background: 'bg-[#F87070]', stroke: 'stroke-[#F87070]', textHover: 'hover:text-[#F87070]' },
  blueAlike: { background: 'bg-[#70F3F8]', stroke: 'stroke-[#70F3F8]', textHover: 'hover:text-[#70F3F8]' },
  purpleAlike: { background: 'bg-[#D881F8]', stroke: 'stroke-[#D881F8]', textHover: 'hover:text-[#D881F8]' },
};

export const defaultValuePomodoro = 25;
export const defaultValueShortBreak = 5;
export const defaultValueLongBreak = 15;

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
} as Record<string, SettingsItems>;

export interface SettingsItems {
  label: string;
  defaultValue: number;
}
export interface TemporalPincer {
  selectedFont: SelectedFont;
  selectedTheme: SelectedTheme;
  selectedMode: SelectedMode;
  pomodoroValue: number;
  shortBreakValue: number;
  longBreakValue: number;
}

export const DataContext = createContext(
  {} as {
    selectedFont: SelectedFont;
    setSelectedFont: Dispatch<SetStateAction<SelectedFont>>;
    selectedTheme: SelectedTheme;
    setSelectedTheme: Dispatch<SetStateAction<SelectedTheme>>;
    selectedMode: SelectedMode;
    setSelectedMode: Dispatch<SetStateAction<SelectedMode>>;
    running: boolean;
    setRunning: Dispatch<SetStateAction<boolean>>;
    generalTimer: number;
    setGeneralTimer: Dispatch<SetStateAction<number>>;
    initialTime: number;
    setInitialTime: Dispatch<SetStateAction<number>>;
    handleOpenSettings: () => void;
    showSettings: boolean;
    setShowSettings: Dispatch<SetStateAction<boolean>>;
    refTimer: React.MutableRefObject<HTMLInputElement[]>;
    audio: HTMLAudioElement | undefined;
    temporalPincer: TemporalPincer;
    setTemporalPincer: Dispatch<SetStateAction<TemporalPincer>>;
  },
);

const audioFile = '../assets/Pager Beeps-SoundBible.com-260751720.mp3';
const undefined = 'undefined';
export const font = 'font';
export const theme = 'theme';

export default function DataProvider({ children }: { children: ReactNode }) {
  const [selectedFont, setSelectedFont] = useState<SelectedFont>(SelectedFont.kumbhSans);
  const [selectedTheme, setSelectedTheme] = useState<SelectedTheme>(SelectedTheme.redAlike);
  const [selectedMode, setSelectedMode] = useState<SelectedMode>(SelectedMode.pomodoro);
  const [running, setRunning] = useState<boolean>(false);
  const [generalTimer, setGeneralTimer] = useState<number>(defaultValuePomodoro * 60);
  const [initialTime, setInitialTime] = useState<number>(defaultValuePomodoro * 60);
  const refTimer = useRef<HTMLInputElement[]>([]);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [temporalPincer, setTemporalPincer] = useState<TemporalPincer>({} as TemporalPincer);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fontStorage = localStorage.getItem(font);
      const themeStorage = localStorage.getItem(theme);
      const valuePomodoro = localStorage.getItem(SelectedMode.pomodoro);
      const valueShortBreak = localStorage.getItem(SelectedMode.shortBreak);
      const valueLongBreak = localStorage.getItem(SelectedMode.longBreak);
      if (fontStorage) setSelectedFont(fontStorage as SelectedFont);
      if (themeStorage) setSelectedTheme(themeStorage as SelectedTheme);
      if (valuePomodoro) {
        refTimer.current[0].value = valuePomodoro;
        setGeneralTimer(Number(valuePomodoro) * 60);
        setInitialTime(Number(valuePomodoro) * 60);
      }
      if (valueShortBreak) refTimer.current[1].value = valueShortBreak;
      if (valueLongBreak) refTimer.current[2].value = valueLongBreak;
      document.documentElement.classList.remove('hidden');
    }
  }, []);

  useEffect(() => {
    document.title = `Pomodoro - ${String(Math.floor(generalTimer / 60)).padStart(1, '0') + ':' + String(generalTimer % 60).padStart(2, '0')}`;
  }, [generalTimer]); // This effect runs whenever generalTimer changes

  useEffect(() => {
    if (typeof window !== undefined) {
      setAudio(new Audio(audioFile));
    }
  }, []);
  useEffect(() => {
    if (generalTimer === 0 && running && audio) {
      audio.currentTime = 0;
      void audio.play();
    }
  }, [audio, generalTimer, running, showSettings]);
  const handleOpenSettings = () => {
    if (running) setRunning(false);
    setShowSettings((prev) => !prev);
    if (showSettings) {
      setSelectedFont(temporalPincer.selectedFont);
      setSelectedTheme(temporalPincer.selectedTheme);
      setSelectedMode(temporalPincer.selectedMode);
      refTimer.current[0].value = temporalPincer.pomodoroValue.toString();
      refTimer.current[1].value = temporalPincer.shortBreakValue.toString();
      refTimer.current[2].value = temporalPincer.longBreakValue.toString();
      setTemporalPincer({} as TemporalPincer);
    } else {
      if (audio) audio.currentTime = audio.duration;
      setTemporalPincer({
        selectedFont,
        selectedTheme,
        selectedMode,
        pomodoroValue: refTimer.current[0].valueAsNumber,
        shortBreakValue: refTimer.current[1].valueAsNumber,
        longBreakValue: refTimer.current[2].valueAsNumber,
      });
    }
  };

  return (
    <DataContext.Provider
      value={{
        selectedFont,
        setSelectedFont,
        selectedTheme,
        setSelectedTheme,
        selectedMode,
        setSelectedMode,
        running,
        setRunning,
        generalTimer,
        setGeneralTimer,
        initialTime,
        setInitialTime,
        handleOpenSettings,
        showSettings,
        setShowSettings,
        refTimer,
        audio,
        temporalPincer,
        setTemporalPincer,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
