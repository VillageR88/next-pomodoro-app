'use client';
import { useEffect, useContext } from 'react';
import Spiral from '@/app/components/Spiral';
import { DataContext, fontItems } from '../_providers/DataContext';
import { themeItems } from '../_providers/DataContext';

export default function Main() {
  const { running, setGeneralTimer, setRunning, generalTimer, initialTime, selectedTheme, audio, selectedFont } =
    useContext(DataContext);
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
  const currentPercentage = (generalTimer / initialTime) * 100 > 0 ? (generalTimer / initialTime) * 100 : 100;
  const phase = running ? 'PAUSE' : generalTimer > 0 ? 'START' : 'RESTART';

  return (
    <main
      className={`${fontItems[selectedFont].variable} relative mt-[45px] flex size-[300px] items-center justify-center rounded-full bg-gradient-to-br from-[#0E112A] to-[#2E325A] sm:size-[410px]`}
    >
      <div className="absolute size-full rounded-full shadow-[55px_45px_60px_-15px_rgba(18,21,48,1)]"></div>
      <div className="absolute size-full rounded-full shadow-[-55px_-45px_60px_-15px_rgba(39,44,90,1)]"></div>
      <div className="relative flex  size-[268px] flex-col items-center justify-center rounded-full bg-[#161932] text-[#D7E0FF] sm:size-[366px]">
        <Spiral currentPercentage={currentPercentage} selectedTheme={selectedTheme} />
        <h1 className={fontItems[selectedFont].h1Class}>
          {String(Math.floor(generalTimer / 60)).padStart(1, '0') + ':' + String(generalTimer % 60).padStart(2, '0')}
        </h1>
        <button
          type="button"
          onClick={() => {
            if (generalTimer === 0) {
              setGeneralTimer(initialTime);
              if (audio) audio.currentTime = audio.duration;
            }
            setRunning((prev) => !prev);
          }}
          className="absolute mt-[120px] flex items-center justify-center text-center text-[14px] font-bold tracking-[13px] sm:mt-[170px] sm:text-[16px] sm:tracking-[15px]"
        >
          <span className={`w-fit pl-4 ${themeItems[selectedTheme].textHover}`}>{phase}</span>
        </button>
      </div>
    </main>
  );
}
