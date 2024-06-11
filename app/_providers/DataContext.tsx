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
  },
);

export default function DataProvider({ children }: { children: ReactNode }) {
  const [selectedFont, setSelectedFont] = useState<SelectedFont>(SelectedFont.kumbhSans);
  const [selectedTheme, setSelectedTheme] = useState<SelectedTheme>(SelectedTheme.redAlike);
  const [selectedMode, setSelectedMode] = useState<SelectedMode>(SelectedMode.pomodoro);
  const [running, setRunning] = useState<boolean>(false);
  const [generalTimer, setGeneralTimer] = useState<number>(25 * 60);
  const [initialTime, setInitialTime] = useState<number>(25 * 60);
  const refTimer = useRef<HTMLInputElement[]>([]);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudio(new Audio('../assets/Pager Beeps-SoundBible.com-260751720.mp3'));
    }
  }, []);
  useEffect(() => {
    if (generalTimer === 0 && running && audio) void audio.play();
  }, [audio, generalTimer, running, showSettings]);

  const handleOpenSettings = () => {
    if (audio) audio.currentTime = audio.duration;
    if (running) {
      setRunning(false);
    }
    setShowSettings((prev) => !prev);
    if (showSettings) {
      if (selectedMode === SelectedMode.pomodoro) {
        setGeneralTimer(refTimer.current[0].valueAsNumber * 60);
        setInitialTime(refTimer.current[0].valueAsNumber * 60);
      } else if (selectedMode === SelectedMode.shortBreak) {
        setGeneralTimer(refTimer.current[1].valueAsNumber * 60);
        setInitialTime(refTimer.current[1].valueAsNumber * 60);
      } else {
        setGeneralTimer(refTimer.current[2].valueAsNumber * 60);
        setInitialTime(refTimer.current[2].valueAsNumber * 60);
      }
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
