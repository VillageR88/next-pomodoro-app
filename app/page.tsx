'use client';
import Image from 'next/image';
import imageSettings from '@/public/assets/icon-settings.svg';
import imageClose from '@/public/assets/icon-close.svg';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [running, setRunning] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [pomodoroTime, setPomodoroTime] = useState<number>(25 * 60);
  const [initialTime, setInitialTime] = useState<number>(25 * 60);
  const currentPercentage = (pomodoroTime / initialTime) * 100 > 0 ? (pomodoroTime / initialTime) * 100 : 100;
  const refPomodoro = useRef<HTMLInputElement>(null);
  const phase = running ? 'PAUSE' : pomodoroTime > 0 ? 'START' : 'RESTART';

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setPomodoroTime((prev) => {
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
        className={`${showSettings ? 'block' : 'hidden'} absolute z-30  h-[464px] w-full max-w-[540px] rounded-[25px] bg-[#FFFFFF] pt-[34px] font-kumbhSans`}
      >
        <div className="flex h-[28px] w-full items-center justify-between pl-[40px] pr-[38.5px]">
          <h2 className=" text-[28px] font-bold text-[#161932]">Settings</h2>
          <button
            onClick={() => {
              setShowSettings((prev) => !prev);
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
            <div className="flex w-[140px] flex-col justify-between gap-[8px]">
              <label className="text-[12px] font-bold text-[#1E213F]/40" htmlFor="pomodoro">
                pomodoro
              </label>
              <input
                ref={refPomodoro}
                className="h-[48px] rounded-[10px] bg-[#EFF1FA] px-[16px] text-[14px] font-bold outline-none"
                id="pomodoro"
                type="number"
                min={1}
                onInput={(event) => {
                  console.log(event.currentTarget.value);
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
                  setRunning(false);
                  if (!refPomodoro.current) return;
                  const currentValue = refPomodoro.current.valueAsNumber;
                  if (currentValue >= 999) {
                    refPomodoro.current.valueAsNumber = 999;
                    setPomodoroTime(999 * 60);
                    setInitialTime(999 * 60);
                  }
                }}
                defaultValue={25}
                max={999}
                onChange={(event) => {
                  setRunning(false);
                  setPomodoroTime(Number(event.target.value) * 60);
                  setInitialTime(Number(event.target.value) * 60);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <header className="text-[32px] font-bold text-[#D7E0FF]">pomodoro</header>
      <nav className="z-10 mt-[55px] flex h-[63px] w-[373px] items-center rounded-[31.5px] bg-[#161932] pl-[7px] font-kumbhSans text-[14px] font-bold">
        <button className="h-[48px] w-[120px] rounded-[26.5px] bg-[#F87070] text-[#1E213F] " type="button">
          pomodoro
        </button>
        <button type="button" className="ml-[22px] text-[#D7E0FF]/40">
          short break
        </button>
        <button type="button" className="ml-[44px] text-[#D7E0FF]/40">
          long break
        </button>
      </nav>
      <main className="relative mt-[45px] flex size-[410px] items-center justify-center rounded-full bg-gradient-to-br from-[#0E112A] to-[#2E325A]">
        <div className="absolute size-full rounded-full shadow-[55px_45px_60px_-15px_rgba(18,21,48,1)]"></div>
        <div className="absolute size-full rounded-full shadow-[-55px_-45px_60px_-15px_rgba(39,44,90,1)]"></div>
        <div className="relative flex size-[366px] flex-col items-center justify-center rounded-full bg-[#161932]">
          <svg className="absolute" viewBox="0 0 36 36">
            <path
              className="circle"
              strokeDasharray={`${currentPercentage.toString()}, 100`}
              d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute font-kumbhSans text-[100px] font-bold tracking-[-5px] text-[#D7E0FF]">
            {String(Math.floor(pomodoroTime / 60)).padStart(1, '0') + ':' + String(pomodoroTime % 60).padStart(2, '0')}
          </div>
          <button
            type="button"
            onClick={() => {
              if (pomodoroTime === 0) setPomodoroTime(initialTime);
              setRunning((prev) => !prev);
            }}
            className="absolute mt-[170px] flex items-center justify-center text-center text-[16px] font-bold tracking-[15px] text-[#D7E0FF]"
          >
            <span className="w-fit pl-4 hover:text-[#F87070]">{phase}</span>
          </button>
        </div>
      </main>
      <footer className="mt-[63px]">
        <button
          onClick={() => {
            setShowSettings((prev) => !prev);
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
