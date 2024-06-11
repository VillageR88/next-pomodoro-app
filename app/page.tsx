'use client';
import Image from 'next/image';
import imageSettings from '@/public/assets/icon-settings.svg';
import { DataContext } from '@/app/_providers/DataContext';
import { useEffect, useContext } from 'react';
import Settings from './home/Settings';
import Header from '@/app/home/Header';
import Spiral from './components/Spiral';
import { SelectedMode, fontItems, settingsItems, themeItems } from '@/app/_providers/DataContext';

export default function Home() {
  const {
    selectedFont,
    selectedTheme,
    selectedMode,
    setSelectedMode,
    running,
    setRunning,
    generalTimer,
    setGeneralTimer,
    initialTime,
    setInitialTime,
    handleOpenSettings,
    refTimer,
    audio,
  } = useContext(DataContext);
  const currentPercentage = (generalTimer / initialTime) * 100 > 0 ? (generalTimer / initialTime) * 100 : 100;
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
  }, [running, setGeneralTimer, setRunning]);

  return (
    <div
      className={`${fontItems[selectedFont].variable} group/home relative z-0 flex min-h-dvh flex-col items-center justify-center overflow-x-clip py-[32px] sm:min-h-screen screen840:px-6`}
    >
      <Settings />
      <Header />
      <nav className="z-10 mt-[55px] flex h-[63px] w-[373px] items-center rounded-[31.5px] bg-[#161932] pl-[7px] text-[14px] font-bold">
        {Object.values(SelectedMode).map((mode) => (
          <button
            key={mode}
            onClick={() => {
              if (audio) audio.currentTime = audio.duration;
              setRunning(false);
              setSelectedMode(mode);
              if (mode === SelectedMode.pomodoro) {
                setGeneralTimer(refTimer.current[0].valueAsNumber * 60);
                setInitialTime(refTimer.current[0].valueAsNumber * 60);
              } else if (mode === SelectedMode.shortBreak) {
                setGeneralTimer(refTimer.current[1].valueAsNumber * 60);
                setInitialTime(refTimer.current[1].valueAsNumber * 60);
              } else {
                setGeneralTimer(refTimer.current[2].valueAsNumber * 60);
                setInitialTime(refTimer.current[2].valueAsNumber * 60);
              }
            }}
            type="button"
            className={`h-[48px] w-[120px] rounded-[26.5px] ${
              selectedMode === mode ? `${themeItems[selectedTheme].background} text-[#1E213F]` : 'text-[#D7E0FF]/40'
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
          <Spiral currentPercentage={currentPercentage} selectedTheme={selectedTheme} />
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
