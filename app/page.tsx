import Image from 'next/image';
import imageSettings from '@/public/assets/icon-settings.svg';

export default function Home() {
  return (
    <div className="group/home relative z-0 flex h-dvh flex-col items-center overflow-x-clip sm:min-h-screen screen840:justify-center screen840:px-6">
      <header className="text-[32px] font-bold text-[#D7E0FF]">pomodoro</header>
      <nav className="z-10 mt-[55px] flex h-[63px] w-[373px] items-center rounded-[31.5px] bg-[#161932] pl-[7px] font-kumbhSans text-[14px] font-bold">
        <button className="h-[48px] w-[120px] rounded-[26.5px] bg-[#F87070] text-[#1E213F]" type="button">
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
              stroke-dasharray="10, 100"
              d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute font-kumbhSans text-[100px] font-bold tracking-[-5px] text-[#D7E0FF]">17:59</div>
          <div className="absolute mt-[170px] text-[16px] font-bold tracking-[15px] text-[#D7E0FF]">PAUSE</div>
        </div>
      </main>
      <footer className="mt-[63px]">
        <button title="settings" className="relative h-[28px] w-[27px]" type="button">
          <Image fill src={imageSettings as string} alt="settings" />
        </button>
      </footer>
    </div>
  );
}
