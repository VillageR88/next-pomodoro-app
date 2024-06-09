export default function Home() {
  return (
    <main className="group/home relative z-0 flex h-dvh flex-col items-center overflow-x-clip sm:min-h-screen screen840:justify-center screen840:px-6">
      <div className="relative flex size-[410px] items-center justify-center rounded-full bg-gradient-to-br from-[#0E112A] to-[#2E325A]">
        <div className="absolute size-full rounded-full shadow-[55px_45px_60px_-15px_rgba(18,21,48,1)]"></div>
        <div className="absolute size-full rounded-full shadow-[-55px_-45px_60px_-15px_rgba(39,44,90,1)]"></div>
        <div className="relative flex size-[366px] flex-col items-center justify-center rounded-full bg-[#161932]">
          <svg className="absolute" viewBox="0 0 36 36">
            <path
              className="circle"
              stroke-dasharray="60"
              d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute font-kumbhSans text-[100px] font-bold tracking-[-5px] text-[#D7E0FF]">17:59</div>
          <div className="absolute mt-[170px] text-[16px] font-bold tracking-[15px] text-[#D7E0FF]">PAUSE</div>
        </div>
      </div>
    </main>
  );
}
