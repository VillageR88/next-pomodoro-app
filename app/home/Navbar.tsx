import { SelectedMode } from '@/app/_providers/DataContext';
import { DataContext, themeItems, settingsItems } from '@/app/_providers/DataContext';
import { useContext } from 'react';

export default function Navbar() {
  const { selectedMode, setSelectedMode, setGeneralTimer, setInitialTime, setRunning, selectedTheme, refTimer, audio } =
    useContext(DataContext);
  return (
    <nav className="z-10 mt-[55px] flex h-[63px] w-[373px] items-center rounded-[31.5px] bg-[#161932] px-[24px] pl-[7px] text-[14px] font-bold">
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
  );
}
