'use client';
import { useContext, useEffect, useRef } from 'react';
import { DataContext, costFormatted, itemsSelectPlan } from '@/app/_providers/DataContext';
import { Plan } from '@/app/_providers/DataContext';
import Image from 'next/image';

const RadioInput = ({
  id,
  title,
  costMonthly,
  costYearly,
  src,
  reference,
}: {
  id: string;
  title: string;
  costMonthly: number;
  costYearly: number;
  src: string;
  reference: (el: HTMLInputElement) => void;
}) => {
  const { setPlan, billing } = useContext(DataContext);
  const discount = '2 months free';

  return (
    <label className="radioParent">
      <input
        onChange={(e) => {
          setPlan([e.target.id as Plan, billing ? costYearly : costMonthly]);
        }}
        ref={reference}
        className="absolute size-0"
        required
        type="radio"
        id={id}
        name="queryType"
        value={id}
      />
      <Image src={src} width={40} height={40} className="size-[40px]" alt="icon" />
      <div className="flex flex-col">
        <h2>{title}</h2>
        <p className="leading-[29px]">
          {billing
            ? costFormatted({ cost: costYearly, billing: billing })
            : costFormatted({ cost: costMonthly, billing: billing })}
        </p>
        <p className="text-[12px] text-[#022959] transition duration-100 group-has-[input[type='checkbox']:not(:checked)]/1:invisible group-has-[input[type='checkbox']:not(:checked)]/1:h-0 group-has-[input[type='checkbox']:not(:checked)]/1:opacity-0">
          {discount}
        </p>
      </div>
    </label>
  );
};

export default function SelectPlan() {
  const radioRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (radioRef.current.length) radioRef.current[0].checked = true;
  }, []);
  const { refSelectPlan, billing, setBilling, setPlan, setAddons } = useContext(DataContext);

  const billingType = {
    monthly: 'Monthly',
    yearly: 'Yearly',
  };
  return (
    <div ref={refSelectPlan} className={`group/1 selectPlan mainComponent hidden `}>
      <header className="flex h-[68px] flex-col gap-[11px]">
        <h1>{itemsSelectPlan.title}</h1>
        <p className="titleDescription">{itemsSelectPlan.description}</p>
      </header>
      <div className=" flex flex-col gap-[32px]">
        <ul className="flex flex-col gap-[24px] screen840:flex-row">
          {Object.keys(itemsSelectPlan.fields).map((key, index) => {
            const item = itemsSelectPlan.fields[key];
            return (
              <li key={index}>
                <RadioInput
                  reference={(el) => radioRef.current.push(el)}
                  id={key}
                  title={item.title}
                  costMonthly={item.costMonthly}
                  costYearly={item.costMonthly * 10}
                  src={item.src}
                />
              </li>
            );
          })}
        </ul>
        <div className="group/2 flex h-[48px] items-center justify-center gap-[24px] rounded-[8px] bg-[#F8F9FF] *:cursor-pointer">
          <label
            htmlFor="billing"
            className="h3Label select-none text-[#022959] active:cursor-default group-has-[input:not(:checked)]/2:pointer-events-none group-has-[input:checked]/2:text-[#9699AA]"
          >
            {billingType.monthly}
          </label>
          <label
            className="flex h-[20px] w-[38px] items-center justify-center rounded-[10px] bg-[#022959]"
            htmlFor="billing"
          >
            <input
              onChange={() => {
                setBilling((prev) => !prev);
                setPlan((prev) => {
                  const newPrev = { ...prev };
                  const planId = prev[0] as string;
                  const plan = itemsSelectPlan.fields[planId];
                  newPrev[1] = billing ? plan.costMonthly : plan.costMonthly * 10;
                  return newPrev;
                });
                setAddons((prev) => ({
                  onlineService: {
                    checked: prev.onlineService.checked,
                    cost: billing ? prev.onlineService.cost / 10 : prev.onlineService.cost * 10,
                  },
                  largerStorage: {
                    checked: prev.largerStorage.checked,
                    cost: billing ? prev.largerStorage.cost / 10 : prev.largerStorage.cost * 10,
                  },
                  customizableProfile: {
                    checked: prev.customizableProfile.checked,
                    cost: billing ? prev.customizableProfile.cost / 10 : prev.customizableProfile.cost * 10,
                  },
                }));
              }}
              title={undefined}
              className="size-[12px] -translate-x-2 cursor-pointer appearance-none rounded-full bg-white transition checked:translate-x-2"
              type="checkbox"
              id="billing"
              name="billing"
            />
          </label>
          <label
            htmlFor="billing"
            className="h3Label select-none text-[#9699AA] active:cursor-default group-has-[input:checked]/2:pointer-events-none group-has-[input:checked]/2:text-[#022959]"
          >
            {billingType.yearly}
          </label>
        </div>
      </div>
    </div>
  );
}
