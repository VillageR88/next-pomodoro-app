import Image from 'next/image';
import imageClose from '@/public/assets/icon-close.svg';
import imageCheck from '@/public/assets/check.svg';
import { DataContext } from '../_providers/DataContext';
import { useContext } from 'react';
import { settingsItems, SelectedFont, fontItems, SelectedTheme, themeItems } from '../_providers/DataContext';

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
      className={`${showSettings ? 'flex flex-col' : 'hidden'} absolute z-30 min-h-[464px] w-full max-w-[540px] items-center rounded-[25px] bg-[#FFFFFF] pt-[34px]`}
    >
      <div className="flex h-[28px] w-full items-center justify-between pl-[40px] pr-[38.5px]">
        <h2 className="text-[28px] font-bold text-[#161932]">Settings</h2>
        <button onClick={handleOpenSettings} title="close" className="relative size-[13px] self-end" type="button">
          <Image fill src={imageClose as string} alt="close" />
        </button>
      </div>
      <div className="mt-[32px] w-full border-b border-[#E3E1E1]"></div>
      <div className="mt-[24px] flex w-full flex-col pl-[40px] pr-[38px]">
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
        <div className="divLine"></div>
        <div className="mt-[24px] flex h-[40px] w-full items-center justify-between">
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
                  }}
                >
                  Aa
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="divLine"></div>
        <div className="mt-[24px] flex h-[40px] w-full items-center justify-between">
          <h3>COLOR</h3>
          <ul className="flex gap-[16px]">
            {Object.values(SelectedTheme).map((theme) => (
              <li key={theme} className="buttonRing">
                <button
                  type="button"
                  className={`size-[40px] rounded-full ${themeItems[theme].background} flex items-center justify-center`}
                  title={theme}
                  onClick={() => {
                    setSelectedTheme(theme);
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
  );
}
