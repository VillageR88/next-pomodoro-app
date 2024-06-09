'use client';
import { useContext } from 'react';
import { DataContext, itemsAddons } from '@/app/_providers/DataContext';
import Image from 'next/image';
import imageCheckmark from '@/public/assets/images/icon-checkmark.svg';

export default function Addons() {
  const { refAddons, billing, setAddons } = useContext(DataContext);

  const formatCost = (cost: number) => {
    const amount = billing ? cost * 10 : cost;
    const prefix = '+$';
    const appendix = billing ? '/yr' : '/mo';
    return `${prefix}${amount.toString()}${appendix}`;
  };

  return (
    <div ref={refAddons} className={`group/1 addons mainComponent hidden`}>
      <header className="flex h-[68px] flex-col gap-[11px]">
        <h1>{itemsAddons.title}</h1>
        <p className="titleDescription">{itemsAddons.description}</p>
      </header>
      <ul className="flex flex-col gap-[16px]">
        {Object.keys(itemsAddons.fields).map((field, index) => {
          const item = itemsAddons.fields[field];

          return (
            <li className="flex" key={index}>
              <label
                htmlFor={field}
                className="checkParent group flex items-center gap-[16px] px-[24px] screen840:gap-[24px]"
              >
                <input
                  onChange={(e) => {
                    setAddons((prev) => ({
                      ...prev,
                      [field]: {
                        checked: e.target.checked,
                        cost: billing ? item.costMonthly * 10 : item.costMonthly,
                      },
                    }));
                  }}
                  title={undefined}
                  id={field}
                  name={field}
                  className="absolute size-0"
                  type="checkbox"
                />
                <div className="flex h-[20px] min-w-[20px] select-none items-center justify-center rounded-[4px] border border-[#D6D9E6] bg-transparent group-has-[input:checked]:border-[#483EFF] group-has-[input:checked]:bg-[#483EFF]">
                  <Image
                    alt="checkbox"
                    className="h-[9px] w-[12px]"
                    width={12}
                    height={9}
                    src={imageCheckmark as string}
                  />
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col gap-[7px]">
                    <h2 className="text-[14px] screen840:text-[16px]">{item.title}</h2>
                    <p className="text-[12px] screen840:text-[15px]">{item.description}</p>
                  </div>
                  <span className="addonCost">{formatCost(item.costMonthly)}</span>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
