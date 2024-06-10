'use client';
import Image from 'next/image';
import imageSettings from '@/public/assets/icon-settings.svg';
import imageClose from '@/public/assets/icon-close.svg';
import { useState, useRef, useEffect } from 'react';

enum SelectedMode {
  POMODORO = 'POMODORO',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK',
}

const defaultValuePomodoro = 25;
const defaultValueShortBreak = 5;
const defaultValueLongBreak = 15;

const settingsItems = {
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

export default function Home() {
  const [running, setRunning] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<SelectedMode>(SelectedMode.POMODORO);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [generalTimer, setGeneralTimer] = useState<number>(25 * 60);
  const [initialTime, setInitialTime] = useState<number>(25 * 60);
  const currentPercentage = (generalTimer / initialTime) * 100 > 0 ? (generalTimer / initialTime) * 100 : 100;
  const refTimer = useRef<HTMLInputElement[]>([]);
  const phase = running ? 'PAUSE' : generalTimer > 0 ? 'START' : 'RESTART';

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setGeneralTimer((prev) => {
        if (prev <= 0) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
      //debug 1000 changed to 10
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [running]);

  return (
    <div className="group/home relative z-0 flex min-h-dvh flex-col items-center justify-center overflow-x-clip py-[32px] sm:min-h-screen screen840:px-6">
      <div
        className={`${showSettings ? 'block' : 'hidden'} absolute z-30 h-[464px] w-full max-w-[540px] rounded-[25px] bg-[#FFFFFF] pt-[34px] font-kumbhSans`}
      >
        <div className="flex h-[28px] w-full items-center justify-between pl-[40px] pr-[38.5px]">
          <h2 className=" text-[28px] font-bold text-[#161932]">Settings</h2>
          <button
            onClick={() => {
              setShowSettings((prev) => !prev);
              if (showSettings && generalTimer === 0) {
                if (refTimer.current[0]) refTimer.current[0].value = defaultValuePomodoro.toString();
                if (selectedMode === SelectedMode.POMODORO) {
                  setGeneralTimer(defaultValuePomodoro * 60);
                  setInitialTime(defaultValuePomodoro * 60);
                }
              }
            }}
            title="close"
            className="relative size-[13px] self-end"
            type="button"
          >
            <Image fill src={imageClose as string} alt="close" />
          </button>
        </div>
        <div className="mt-[32px] h-px w-full bg-[#E3E1E1]"></div>
        <div className="mt-[24px] flex h-[109px] w-full flex-col justify-between pl-[40px] pr-[38px]">
          <h3 className="text-[13px] font-bold tracking-[5px] text-[#161932]">TIME (MINUTES)</h3>
          <div className="flex h-[70px] w-[462px] justify-between gap-[20px]">
            <ul className="flex w-full justify-between">
              {Object.entries(settingsItems).map(([key, value]) => (
                <li key={key} className="flex w-[140px] flex-col justify-between gap-[8px]">
                  <label className="text-[12px] font-bold text-[#1E213F]/40" htmlFor={key}>
                    {value.label}
                  </label>
                  <div className="relative">
                    <input
                      ref={(element) => {
                        if (element) refTimer.current.push(element);
                      }}
                      className="h-[48px] w-[140px] rounded-[10px] bg-[#EFF1FA] px-[16px] text-[14px] font-bold outline-none"
                      id={key}
                      type="number"
                      min={1}
                      onInput={(event) => {
                        event.currentTarget.value = event.currentTarget.value.replace(/[^0-9]/g, '');
                      }}
                      onKeyDown={(event) => {
                        if (
                          event.key === 'e' ||
                          event.key === 'E' ||
                          event.key === '.' ||
                          event.key === ',' ||
                          event.key === '-' ||
                          event.key === '+'
                        ) {
                          event.preventDefault();
                        }
                      }}
                      onKeyUp={() => {
                        if (!refTimer.current[0]) return;
                        const currentValue = refTimer.current[0].valueAsNumber;
                        if (currentValue >= 999) {
                          refTimer.current[0].valueAsNumber = 999;
                        }
                      }}
                      defaultValue={value.defaultValue}
                      max={999}
                      onChange={(event) => {
                        const initialSettings = Number(event.target.value) * 60;
                        if (selectedMode === SelectedMode.POMODORO) {
                          setRunning(false);
                          setGeneralTimer(initialSettings);
                          setInitialTime(initialSettings);
                        }
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <header className="text-[32px] font-bold text-[#D7E0FF]">pomodoro</header>
      <nav className="z-10 mt-[55px] flex h-[63px] w-[373px] items-center rounded-[31.5px] bg-[#161932] pl-[7px] font-kumbhSans text-[14px] font-bold">
        {Object.values(SelectedMode).map((mode, index) => (
          <button
            key={mode}
            onClick={() => {
              setRunning(false);
              setSelectedMode(mode as SelectedMode);
              if (mode === SelectedMode.POMODORO) {
                setGeneralTimer(defaultValuePomodoro * 60);
                setInitialTime(defaultValuePomodoro * 60);
                if (refTimer.current[0]) refTimer.current[0].value = defaultValuePomodoro.toString();
              } else if (mode === SelectedMode.SHORT_BREAK) {
                setGeneralTimer(defaultValueShortBreak * 60);
                setInitialTime(defaultValueShortBreak * 60);
              } else {
                setGeneralTimer(defaultValueLongBreak * 60);
                setInitialTime(defaultValueLongBreak * 60);
              }
            }}
            type="button"
            className={`h-[48px] w-[120px] rounded-[26.5px] ${
              selectedMode === mode ? 'bg-[#F87070] text-[#1E213F]' : 'text-[#D7E0FF]/40'
            }`}
          >
            {mode.toLowerCase().replace('_', ' ')}
          </button>
        ))}
      </nav>
      <main className="relative mt-[45px] flex size-[300px] items-center justify-center rounded-full bg-gradient-to-br from-[#0E112A] to-[#2E325A] sm:size-[410px]">
        <div className="absolute size-full rounded-full shadow-[55px_45px_60px_-15px_rgba(18,21,48,1)]"></div>
        <div className="absolute size-full rounded-full shadow-[-55px_-45px_60px_-15px_rgba(39,44,90,1)]"></div>
        <div className="relative flex size-[268px] flex-col items-center justify-center rounded-full bg-[#161932] sm:size-[366px]">
          <svg className="absolute" viewBox="0 0 36 36">
            <path
              className="circle"
              strokeDasharray={`${currentPercentage.toString()}, 100`}
              d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute font-kumbhSans text-[80px] font-bold tracking-[-4px] text-[#D7E0FF] sm:text-[100px] sm:tracking-[-5px]">
            {String(Math.floor(generalTimer / 60)).padStart(1, '0') + ':' + String(generalTimer % 60).padStart(2, '0')}
          </div>
          <button
            type="button"
            onClick={() => {
              if (generalTimer === 0) setGeneralTimer(initialTime);
              setRunning((prev) => !prev);
            }}
            className="absolute mt-[120px] flex items-center justify-center text-center text-[14px] font-bold tracking-[13px] text-[#D7E0FF] sm:mt-[170px] sm:text-[16px] sm:tracking-[15px]"
          >
            <span className="w-fit pl-4 hover:text-[#F87070]">{phase}</span>
          </button>
        </div>
      </main>
      <footer className="mt-[63px]">
        <button
          onClick={() => {
            setShowSettings((prev) => !prev);
            if (showSettings && generalTimer === 0) {
              setGeneralTimer(defaultValuePomodoro * 60);
              setInitialTime(defaultValuePomodoro * 60);
              if (refTimer.current[0]) refTimer.current[0].value = defaultValuePomodoro.toString();
            }
          }}
          title="settings"
          className="relative h-[28px] w-[27px]"
          type="button"
        >
          <Image fill src={imageSettings as string} alt="settings" />
        </button>
      </footer>
    </div>
  );
}
{
  /* <button
onClick={() => {
  setShowSettings((prev) => !prev);
}}
title="close"
className="relative size-[13px] self-end"
type="button"
>
<Image fill src={imageClose as string} alt="close" />
</button> */
}
