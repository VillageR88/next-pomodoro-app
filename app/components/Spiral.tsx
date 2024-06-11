import { themeItems } from '../_providers/DataContext';

export default function Spiral({
  currentPercentage,
  selectedTheme,
}: {
  currentPercentage: number;
  selectedTheme: string;
}) {
  return (
    <svg className={`absolute ${themeItems[selectedTheme as keyof typeof themeItems].stroke}`} viewBox="0 0 36 36">
      <path
        className="circle"
        strokeDasharray={`${currentPercentage.toString()}, 100`}
        d="M18 2.0845
  a 15.9155 15.9155 0 0 1 0 31.831
  a 15.9155 15.9155 0 0 1 0 -31.831"
      />
    </svg>
  );
}
