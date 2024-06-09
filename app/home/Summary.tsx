'use client';
import { useContext } from 'react';
import { DataContext, costFormatted, itemsSummary, itemsAddons } from '@/app/_providers/DataContext';

export default function Summary() {
  const { refSummary, billing, plan, refSelectPlan, addons, refButtonNext, refButtonConfirm } = useContext(DataContext);
  const selected = 'selected';
  const hidden = 'hidden';
  const flex = 'flex';
  const billingText = billing ? itemsSummary.billing.yearly : itemsSummary.billing.monthly;
  const anyChecked = addons.onlineService.checked || addons.largerStorage.checked || addons.customizableProfile.checked;
  const totalTitle = 'Total ' + (billing ? '(per year)' : '(per month)');
  return (
    <div ref={refSummary} className={`group/1 summary mainComponent hidden`}>
      <header className="flex h-[68px] flex-col gap-[11px]">
        <h1>{itemsSummary.title}</h1>
        <p className="titleDescription">{itemsSummary.description}</p>
      </header>
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[16px] rounded-[8px] bg-[#F8F9FF] px-[24px] pb-[24px] pt-[16px]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[4px]">
              <h2 className="text-[14px] screen840:text-[16px]">
                {plan && plan[0][0].toUpperCase() + plan[0].slice(1) + billingText.toString()}
              </h2>
              <button
                onClick={() => {
                  if (!refSummary.current || !refSelectPlan.current) return;
                  refSummary.current.classList.remove(selected);
                  refSummary.current.classList.add(hidden);
                  refSummary.current.classList.remove(flex);
                  refSelectPlan.current.classList.add(selected);
                  refSelectPlan.current.classList.remove(hidden);
                  refSelectPlan.current.classList.add(flex);
                  refButtonNext.current?.classList.remove(hidden);
                  refButtonConfirm.current?.classList.add(hidden);
                  refButtonConfirm.current?.classList.remove(flex);
                }}
                type="button"
                className="w-fit text-[14px] leading-[20px] text-[#9699AA] underline underline-offset-[3px] screen840:underline-offset-2"
              >
                Change
              </button>
            </div>
            <p className="text-[16px] font-bold text-[#022959]">
              {costFormatted({
                cost: plan?.[1],
                billing,
              })}
            </p>
          </div>
          {anyChecked && (
            <div className="flex flex-col gap-[12px] text-[14px] text-[#9699AA] screen840:gap-[16px]">
              <div className="h-px w-full bg-[#9699AA]/20"></div>
              {Object.keys(addons).map((key) => {
                return (
                  addons[key as keyof typeof addons].checked && (
                    <div key={key} className="flex justify-between">
                      <p>{Object.values(itemsAddons.fields[key].title)}</p>
                      <p className="text-[#022959]">
                        {costFormatted({
                          cost: Object.entries(addons).filter((x) => x[0] === key)[0][1].cost,
                          billing: billing,
                          prefixWithPlus: true,
                        })}
                      </p>
                    </div>
                  )
                );
              })}
            </div>
          )}
        </div>
        {anyChecked && (
          <div className="flex justify-between px-[24px]">
            <p>{totalTitle}</p>
            <p className="text-[16px] font-bold leading-[20px] text-[#483EFF] screen840:text-[20px]">
              {costFormatted({
                cost:
                  plan && plan[1] + Object.values(addons).reduce((acc, cur) => (cur.checked ? acc + cur.cost : acc), 0),
                billing,
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
