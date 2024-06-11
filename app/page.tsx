'use client';

import { DataContext } from '@/app/_providers/DataContext';
import { useEffect, useContext } from 'react';
import Settings from './home/Settings';
import Header from '@/app/home/Header';
import Navbar from './home/Navbar';
import Spiral from './components/Spiral';
import Footer from './home/Footer';
import { fontItems, themeItems } from '@/app/_providers/DataContext';

export default function Home() {
  const {
    selectedFont,
    selectedTheme,

    running,
    setRunning,
    generalTimer,
    setGeneralTimer,
    initialTime,
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
      className={`${fontItems[selectedFont].variable} group/home relative z-0 flex min-h-dvh flex-col items-center justify-center overflow-x-clip px-2 py-[32px] sm:min-h-screen sm:py-[80px] screen840:px-6`}
    >
      <Settings />
      <Header />
      <Navbar />
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
            <span className={`w-fit pl-4 ${themeItems[selectedTheme].textHover}`}>{phase}</span>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
