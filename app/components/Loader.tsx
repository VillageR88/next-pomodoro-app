'use client';
import { RotatingLines } from 'react-loader-spinner';

export default function Loader({ pending }: { pending: boolean }) {
  if (!pending) return null;
  return (
    <RotatingLines
      visible={true}
      width="30"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      strokeColor="white"
    />
  );
}
