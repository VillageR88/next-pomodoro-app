export default function Home() {
  return (
    <main className="group/home relative z-0 flex h-dvh flex-col items-center overflow-x-clip sm:min-h-screen screen840:justify-center screen840:px-6">
      <div className="flex size-[410px] items-center justify-center rounded-full bg-gradient-to-br from-[#0E112A] to-[#2E325A]">
        <div className="flex size-[366px] flex-col items-center justify-center rounded-full bg-[#161932]">
          <svg viewBox="0 0 36 36">
            <path
              className="circle"
              stroke-dasharray="60"
              d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </div>
      </div>
    </main>
  );
}
