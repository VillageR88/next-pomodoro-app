'use client';
import { ReactNode, useRef, createContext, RefObject, useState, Dispatch, SetStateAction } from 'react';
import imageArcade from '@/public/assets/images/icon-arcade.svg';
import imageAdvanced from '@/public/assets/images/icon-advanced.svg';
import imagePro from '@/public/assets/images/icon-pro.svg';

export enum Steps {
  YOUR_INFO = 'YOUR INFO',
  SELECT_PLAN = 'SELECT PLAN',
  ADD_ONS = 'ADD-ONS',
  SUMMARY = 'SUMMARY',
}

export enum Plan {
  ARCADE = 'arcade',
  ADVANCED = 'advanced',
  PRO = 'pro',
}

export interface tAddons {
  onlineService: { checked: boolean; cost: number };
  largerStorage: { checked: boolean; cost: number };
  customizableProfile: { checked: boolean; cost: number };
}

interface tItemsAddons {
  title: string;
  description: string;
  fields: Record<
    string,
    {
      title: string;
      description: string;
      costMonthly: number;
    }
  >;
}
[];

interface tItemsSelectPlan {
  title: string;
  description: string;
  fields: Record<
    string,
    {
      title: string;
      costMonthly: number;
      src: string;
    }
  >;
}
[];

export const itemsSelectPlan: tItemsSelectPlan = {
  title: 'Select your plan',
  description: 'You have the option of monthly or yearly billing.',
  fields: {
    arcade: {
      title: 'Arcade',
      costMonthly: 9,
      src: imageArcade as string,
    },
    advanced: {
      title: 'Advanced',
      costMonthly: 12,
      src: imageAdvanced as string,
    },
    pro: {
      title: 'Pro',
      costMonthly: 15,
      src: imagePro as string,
    },
  },
};

export const itemsAddons: tItemsAddons = {
  title: 'Pick add-ons',
  description: 'Add-ons help enhance your gaming experience.',
  fields: {
    onlineService: {
      title: 'Online service',
      description: 'Access to multiplayer games',
      costMonthly: 1,
    },
    largerStorage: {
      title: 'Larger storage',
      description: 'Extra 1TB of cloud save',
      costMonthly: 1,
    },
    customizableProfile: {
      title: 'Customizable profile',
      description: 'Custom theme on your profile',
      costMonthly: 2,
    },
  },
};

export const itemsSummary = {
  title: 'Finishing up',
  description: 'Double-check everything looks OK before confirming.',
  billing: {
    monthly: ' (Monthly)',
    yearly: ' (Yearly)',
  },
};

export const costFormatted = ({
  cost,
  billing,
  prefixWithPlus,
}: {
  cost: number | undefined;
  billing: boolean;
  prefixWithPlus?: boolean;
}): string | undefined => {
  if (!cost) return;
  const firstPart = `$${cost.toString()}`;
  const secondPart = billing ? '/yr' : '/mo';
  if (prefixWithPlus) return `+${firstPart + secondPart}`;
  else return firstPart + secondPart;
};

//const items = Object.values(Steps);
export const DataContext = createContext(
  {} as {
    refYourInfo: RefObject<HTMLDivElement>;
    refSelectPlan: RefObject<HTMLDivElement>;
    refAddons: RefObject<HTMLDivElement>;
    refSummary: RefObject<HTMLDivElement>;
    refThankYou: RefObject<HTMLDivElement>;
    refName: RefObject<HTMLInputElement>;
    refMail: RefObject<HTMLInputElement>;
    refTel: RefObject<HTMLInputElement>;
    refNameError: RefObject<HTMLSpanElement>;
    refMailError: RefObject<HTMLSpanElement>;
    refTelError: RefObject<HTMLSpanElement>;
    refButtonNext: RefObject<HTMLButtonElement>;
    refButtonPrevious: RefObject<HTMLButtonElement>;
    refButtonConfirm: RefObject<HTMLButtonElement>;
    billing: boolean;
    setBilling: Dispatch<SetStateAction<boolean>>;
    plan: [Plan, number] | undefined;
    setPlan: Dispatch<SetStateAction<[Plan, number]>>;
    addons: {
      onlineService: { checked: boolean; cost: number };
      largerStorage: { checked: boolean; cost: number };
      customizableProfile: { checked: boolean; cost: number };
    };
    setAddons: Dispatch<
      SetStateAction<{
        onlineService: { checked: boolean; cost: number };
        largerStorage: { checked: boolean; cost: number };
        customizableProfile: { checked: boolean; cost: number };
      }>
    >;
  },
);

export default function DataProvider({ children }: { children: ReactNode }) {
  const [billing, setBilling] = useState(false);
  const [plan, setPlan] = useState<[Plan, number]>([Plan.ARCADE, 9]);
  const [addons, setAddons] = useState<{
    onlineService: { checked: boolean; cost: number };
    largerStorage: { checked: boolean; cost: number };
    customizableProfile: { checked: boolean; cost: number };
  }>({
    onlineService: { checked: false, cost: 1 },
    largerStorage: { checked: false, cost: 2 },
    customizableProfile: { checked: false, cost: 2 },
  });

  const refYourInfo = useRef<HTMLDivElement>(null);
  const refSelectPlan = useRef<HTMLDivElement>(null);
  const refAddons = useRef<HTMLDivElement>(null);
  const refSummary = useRef<HTMLDivElement>(null);
  const refThankYou = useRef<HTMLDivElement>(null);
  const refName = useRef<HTMLInputElement>(null);
  const refMail = useRef<HTMLInputElement>(null);
  const refTel = useRef<HTMLInputElement>(null);
  const refNameError = useRef<HTMLSpanElement>(null);
  const refMailError = useRef<HTMLSpanElement>(null);
  const refTelError = useRef<HTMLSpanElement>(null);
  const refButtonNext = useRef<HTMLButtonElement>(null);
  const refButtonPrevious = useRef<HTMLButtonElement>(null);
  const refButtonConfirm = useRef<HTMLButtonElement>(null);

  return (
    <DataContext.Provider
      value={{
        refYourInfo,
        refSelectPlan,
        refAddons,
        refSummary,
        refThankYou,
        refName,
        refMail,
        refTel,
        refNameError,
        refMailError,
        refTelError,
        refButtonNext,
        refButtonPrevious,
        refButtonConfirm,
        billing,
        setBilling,
        plan,
        setPlan,
        addons,
        setAddons,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
