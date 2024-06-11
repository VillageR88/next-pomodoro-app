import Settings from './home/Settings';
import Header from '@/app/home/Header';
import Navbar from './home/Navbar';
import Main from './home/Main';
import Footer from './home/Footer';

export default function Home() {
  return (
    <div
      className={` group/home relative z-0 flex min-h-dvh flex-col items-center justify-center overflow-x-clip px-2 py-[32px] sm:min-h-screen sm:py-[80px] screen840:px-6`}
    >
      <Settings />
      <Header />
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}
