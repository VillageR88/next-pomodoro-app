'use client';
import Image from 'next/image';
import imageClose from '@/public/assets/icon-close.svg';
import imageCheck from '@/public/assets/check.svg';
import imageReset from '@/public/assets/restart_alt_24dp_FILL0_wght400_GRAD0_opsz24.svg';
import { DataContext } from '../_providers/DataContext';
import { useContext } from 'react';
import { settingsItems, SelectedFont, fontItems, SelectedTheme, themeItems } from '../_providers/DataContext';

const items = {
  title: 'Settings',
  time: {
    title: 'TIME (MINUTES)',
  },
  font: {
    title: 'FONT',
    letters: 'Aa',
  },
  color: {
    title: 'COLOR',
  },
  applyButton: {
    title: 'Apply',
  },
};

export default function Settings() {
  const {
    handleOpenSettings,
    selectedFont,
    selectedTheme,
    showSettings,
    refTimer,
    setGeneralTimer,
    setInitialTime,
    setSelectedFont,
    setSelectedTheme,
  } = useContext(DataContext);
  return (
    <div
      className={`${showSettings ? 'block' : 'hidden'} ${fontItems[selectedFont].variable} absolute z-30 mt-[32px] w-full items-center sm:mt-[27px]`}
    >
      <div className="flex w-full flex-col items-center px-[24px]">
        <div
          className={`flex min-h-[549px] w-full max-w-[540px] flex-col items-center rounded-[25px] bg-[#FFFFFF] pt-[24px] sm:min-h-[464px] sm:pt-[34px]`}
        >
          <div className="flex h-[28px] w-full items-center justify-between pl-[40px] pr-[38.5px]">
            <div className="flex items-center gap-6">
              <h2 className="text-[20px] font-bold text-[#161932] sm:text-[28px]">{items.title}</h2>
              <button
                onClick={() => {
                  localStorage.clear();
                  setSelectedFont(SelectedFont.kumbhSans);
                  setSelectedTheme(SelectedTheme.redAlike);
                }}
                type="button"
                title="reset settings"
                className="relative size-[24px]"
              >
                <Image fill src={imageReset as string} alt="reset settings" />
              </button>
            </div>
            <button
              onClick={handleOpenSettings}
              title="close"
              className="relative size-[13px] sm:mb-px sm:self-end"
              type="button"
            >
              <Image fill src={imageClose as string} alt="close" />
            </button>
          </div>
          <div className="mt-[24px] w-full border-b border-[#E3E1E1] sm:mt-[32px]"></div>
          <div className="mt-[24px] flex w-full flex-col items-center pl-[40px] pr-[38px] sm:items-start">
            <h3>{items.time.title}</h3>
            <div className="mt-[18px] flex w-full justify-between gap-[20px] sm:mt-[22px] sm:h-[70px] sm:w-[462px]">
              <ul className="flex w-full flex-col justify-between gap-[8px] sm:flex-row sm:gap-0">
                {Object.entries(settingsItems).map(([key, value], index) => (
                  <li
                    key={key}
                    className="flex flex-row items-center justify-between gap-[8px] sm:w-fit sm:flex-col sm:items-start"
                  >
                    <label className="text-[12px] font-bold text-[#1E213F]/40" htmlFor={key}>
                      {value.label}
                    </label>
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
                  </li>
                ))}
              </ul>
            </div>
            <div className="divLine"></div>
            <div className="mt-[24px] flex w-full flex-col items-center justify-between gap-[18px] sm:h-[40px] sm:flex-row">
              <h3>FONT</h3>
              <ul className="flex gap-[16px]">
                {Object.values(SelectedFont).map((font, index, arr) => (
                  <li className="buttonRing" key={font}>
                    <button
                      type="button"
                      className={`size-[40px] rounded-full ${font === selectedFont ? 'bg-[#161932] text-[#FFFFFF]' : ' bg-[#EFF1FA] text-[#1E213F]'} ${fontItems[font].variable} ${arr.length === index + 2 ? '' : 'font-bold'}`}
                      title={fontItems[font].name}
                      onClick={() => {
                        setSelectedFont(font);
                        localStorage.setItem('font', font);
                      }}
                    >
                      {items.font.letters}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="divLine"></div>
            <div className="mt-[16px] flex w-full flex-col items-center justify-between gap-[18px] pb-[59px] sm:mt-[24px] sm:h-[40px] sm:flex-row sm:pb-0">
              <h3>{items.color.title}</h3>
              <ul className="flex gap-[16px]">
                {Object.values(SelectedTheme).map((theme) => (
                  <li key={theme} className="buttonRing">
                    <button
                      type="button"
                      className={`size-[40px] rounded-full ${themeItems[theme].background} flex items-center justify-center`}
                      title={theme}
                      onClick={() => {
                        setSelectedTheme(theme);
                        localStorage.setItem('theme', theme);
                      }}
                    >
                      <Image
                        width={15}
                        height={11}
                        className={`${theme === selectedTheme ? 'flex' : 'hidden'} h-[11px] w-[15px]`}
                        src={imageCheck as string}
                        alt="check"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <button
          type="button"
          className={`${themeItems[selectedTheme].background} mt-[-27px] flex h-[53px] w-[140px] items-center justify-center rounded-[26.5px] text-[16px] font-bold ${selectedTheme === SelectedTheme.blueAlike ? 'text-[#1E213F]' : 'text-[#FFFFFF]'}`}
        >
          {items.applyButton.title}
        </button>
      </div>
    </div>
  );
}
