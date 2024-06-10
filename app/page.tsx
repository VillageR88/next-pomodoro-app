'use client';
import Image from 'next/image';
import imageSettings from '@/public/assets/icon-settings.svg';
import imageClose from '@/public/assets/icon-close.svg';
import { useState, useRef, useEffect } from 'react';

enum SelectedMode {
  POMODORO = 'pomodoro',
  SHORT_BREAK = 'shortBreak',
  LONG_BREAK = 'longBreak',
}

enum SelectedFont {
  KUMBH_SANS = 'kumbhSans',
  ROBOTO_SLAB = 'robotoSlab',
  SPACE_MONO = 'spaceMono',
}

const fontSettings = {
  kumbhSans: { variable: 'font-kumbhSans', name: 'Kumbh Sans' },
  robotoSlab: { variable: 'font-robotoSlab', name: 'Roboto Slab' },
  spaceMono: { variable: 'font-spaceMono', name: 'Space Mono' },
};

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
  const [selectedFont, setSelectedFont] = useState<SelectedFont>(SelectedFont.KUMBH_SANS);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [generalTimer, setGeneralTimer] = useState<number>(25 * 60);
  const [initialTime, setInitialTime] = useState<number>(25 * 60);
  const currentPercentage = (generalTimer / initialTime) * 100 > 0 ? (generalTimer / initialTime) * 100 : 100;
  const refTimer = useRef<HTMLInputElement[]>([]);
  const phase = running ? 'PAUSE' : generalTimer > 0 ? 'START' : 'RESTART';
  const [audio, setAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudio(new Audio('../assets/Pager Beeps-SoundBible.com-260751720.mp3'));
    }
  }, []);

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
      if (selectedMode === SelectedMode.POMODORO) {
        setGeneralTimer(refTimer.current[0].valueAsNumber * 60);
        setInitialTime(refTimer.current[0].valueAsNumber * 60);
      } else if (selectedMode === SelectedMode.SHORT_BREAK) {
        setGeneralTimer(refTimer.current[1].valueAsNumber * 60);
        setInitialTime(refTimer.current[1].valueAsNumber * 60);
      } else {
        setGeneralTimer(refTimer.current[2].valueAsNumber * 60);
        setInitialTime(refTimer.current[2].valueAsNumber * 60);
      }
    }
  };
  return (
    <div
      className={`${selectedFont} group/home relative z-0 flex min-h-dvh flex-col items-center justify-center overflow-x-clip py-[32px] sm:min-h-screen screen840:px-6`}
    >
      <div
        className={`${showSettings ? 'flex flex-col' : 'hidden'} absolute z-30 min-h-[464px] w-full max-w-[540px] items-center rounded-[25px] bg-[#FFFFFF] pt-[34px] ${fontSettings[selectedFont].variable}`}
      >
        <div className="flex h-[28px] w-full items-center justify-between pl-[40px] pr-[38.5px]">
          <h2 className="text-[28px] font-bold text-[#161932]">Settings</h2>
          <button onClick={handleOpenSettings} title="close" className="relative size-[13px] self-end" type="button">
            <Image fill src={imageClose as string} alt="close" />
          </button>
        </div>
        <div className="mt-[32px] h-px w-full bg-[#E3E1E1]"></div>
        <div className="mt-[24px] flex  w-full flex-col pl-[40px] pr-[38px]">
          <h3>TIME (MINUTES)</h3>
          <div className="flex h-[70px] w-[462px] justify-between gap-[20px]">
            <ul className="flex w-full justify-between">
              {Object.entries(settingsItems).map(([key, value], index) => (
                <li key={key} className="flex w-[140px] flex-col justify-between gap-[8px]">
                  <label className="text-[12px] font-bold text-[#1E213F]/40" htmlFor={key}>
                    {value.label}
                  </label>
                  <div className="relative">
                    <input
                      onBlur={() => {
                        if (refTimer.current[index].value === '') {
                          refTimer.current[index].valueAsNumber = 1;
                          setGeneralTimer(1 * 60);
                          setInitialTime(1 * 60);
                        }
                      }}
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
                        const currentValue = refTimer.current[index].valueAsNumber;
                        if (currentValue >= 999) {
                          refTimer.current[index].valueAsNumber = 999;
                          setGeneralTimer(999 * 60);
                          setInitialTime(999 * 60);
                        } else if (currentValue <= 1) {
                          refTimer.current[index].valueAsNumber = 1;
                          setGeneralTimer(1 * 60);
                          setInitialTime(1 * 60);
                        }
                      }}
                      defaultValue={value.defaultValue}
                      max={999}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-[24px] h-px w-full bg-[#161932]/10"></div>
          <div className="mt-[24px] flex h-[40px] w-full items-center justify-between">
            <h3>FONT</h3>
            <ul className="flex gap-[16px]">
              {Object.values(SelectedFont).map((font, index, arr) => (
                <li className="buttonRing" key={font}>
                  <button
                    type="button"
                    className={`size-[40px] rounded-full ${font === selectedFont ? 'bg-[#161932] text-[#FFFFFF]' : ' bg-[#EFF1FA] text-[#1E213F]'} ${fontSettings[font].variable} ${arr.length === index + 2 ? '' : 'font-bold'}`}
                    title={fontSettings[font].name}
                    onClick={() => {
                      setSelectedFont(font);
                    }}
                  >
                    Aa
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <header className="font-kumbhSans text-[32px] font-bold text-[#D7E0FF]">pomodoro</header>
      <nav className="z-10 mt-[55px] flex h-[63px] w-[373px] items-center rounded-[31.5px] bg-[#161932] pl-[7px] text-[14px] font-bold">
        {Object.values(SelectedMode).map((mode) => (
          <button
            key={mode}
            onClick={() => {
              if (audio) audio.currentTime = audio.duration;
              setRunning(false);
              setSelectedMode(mode);
              if (mode === SelectedMode.POMODORO) {
                setGeneralTimer(refTimer.current[0].valueAsNumber * 60);
                setInitialTime(refTimer.current[0].valueAsNumber * 60);
              } else if (mode === SelectedMode.SHORT_BREAK) {
                setGeneralTimer(refTimer.current[1].valueAsNumber * 60);
                setInitialTime(refTimer.current[1].valueAsNumber * 60);
              } else {
                setGeneralTimer(refTimer.current[2].valueAsNumber * 60);
                setInitialTime(refTimer.current[2].valueAsNumber * 60);
              }
            }}
            type="button"
            className={`h-[48px] w-[120px] rounded-[26.5px] ${
              selectedMode === mode ? 'bg-[#F87070] text-[#1E213F]' : 'text-[#D7E0FF]/40'
            }`}
          >
            {settingsItems[mode].label}
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
          <div className="absolute text-[80px] font-bold tracking-[-4px] text-[#D7E0FF] sm:text-[100px] sm:tracking-[-5px]">
            {String(Math.floor(generalTimer / 60)).padStart(1, '0') + ':' + String(generalTimer % 60).padStart(2, '0')}
          </div>
          <button
            type="button"
            onClick={() => {
              if (generalTimer === 0) {
                setGeneralTimer(initialTime);
                if (audio) audio.currentTime = audio.duration;
              }
              setRunning((prev) => !prev);
            }}
            className="absolute mt-[120px] flex items-center justify-center text-center text-[14px] font-bold tracking-[13px] text-[#D7E0FF] sm:mt-[170px] sm:text-[16px] sm:tracking-[15px]"
          >
            <span className="w-fit pl-4 hover:text-[#F87070]">{phase}</span>
          </button>
        </div>
      </main>
      <footer className="mt-[63px]">
        <button onClick={handleOpenSettings} title="settings" className="relative h-[28px] w-[27px]" type="button">
          <Image fill src={imageSettings as string} alt="settings" />
        </button>
      </footer>
    </div>
  );
}
