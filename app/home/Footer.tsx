'use client';

import Image from 'next/image';
import imageSettings from '@/public/assets/icon-settings.svg';
import { DataContext } from '../_providers/DataContext';
import { useContext } from 'react';

export default function Footer() {
  const { handleOpenSettings } = useContext(DataContext);
  return (
    <footer className="mt-[63px]">
      <button onClick={handleOpenSettings} title="settings" className="relative h-[28px] w-[27px]" type="button">
        <Image fill src={imageSettings as string} alt="settings" />
      </button>
    </footer>
  );
}
