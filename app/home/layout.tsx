'use client';
import { ReactNode, createRef, useContext, useEffect } from 'react';
import { DataContext } from '@/app/_providers/DataContext';
import Image from 'next/image';
import imageSidebarDesktop from '@/public/assets/images/bg-sidebar-desktop.svg';
import imageSidebarMobile from '@/public/assets/images/bg-sidebar-mobile.svg';
import { Steps } from '@/app/_providers/DataContext';
import { useFormState, useFormStatus } from 'react-dom';
import Loader from '../components/Loader';
import { CreateInvoiceContactForm } from '@/app/_lib/functionsServer';

const titles = {
  step: 'STEP ',
  buttonPrevious: 'Go Back',
  buttonNext: 'Next Step',
  confirm: 'Confirm',
};
const selected = 'selected';
const hidden = 'hidden';
const flex = 'flex';
const invisible = 'invisible';
const errorInput = 'errorInput';

const formatNumber = (number: string): string => {
  number = number.replaceAll(' ', '');
  number = number.replaceAll('-', '');
  number = number.replaceAll('+', '');
  number = number.replaceAll('(', '');
  number = number.replaceAll(')', '');
  return number;
};

const SubmitButton = ({ refButtonConfirm }: { refButtonConfirm: React.RefObject<HTMLButtonElement> }) => {
  const { pending } = useFormStatus();

  return (
    <button
      ref={refButtonConfirm}
      type="submit"
      className="hidden h-[48px] w-[123px] items-center justify-center rounded-[8px] bg-[#483EFF] text-white
"
    >
      {pending ? <Loader pending={pending} /> : titles.confirm}
    </button>
  );
};

export default function LayoutHome({ children }: { children: ReactNode }) {
  const errorMessages = {
    fieldRequired: 'This field is required',
    invalidEmail: 'Invalid email address',
    invalidTel: 'Invalid phone number',
  };
  const refDivButtons = createRef<HTMLDivElement>();
  const {
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
    refButtonConfirm,
    refButtonNext,
    refButtonPrevious,
    plan,
    addons,
  } = useContext(DataContext);

  const sum =
    (plan && plan[1] + Object.values(addons).reduce((acc, cur) => (cur.checked ? acc + cur.cost : acc), 0)) ?? 0;
  const [state, action] = useFormState<
    {
      number: number;
      redirection: boolean;
    },
    FormData
  >((state, payload) => CreateInvoiceContactForm(state, payload, sum), {
    number: 0,
    redirection: false,
  });

  const circleArray = ['circle1', 'circle2', 'circle3', 'circle4'];

  const items = Object.values(Steps);

  const Circle = ({ index }: { index: number }) => {
    return (
      <div
        className={`${circleArray[index]} flex size-[33px] items-center justify-center rounded-full border border-white text-[14px] font-bold text-white`}
      >
        {index + 1}
      </div>
    );
  };

  useEffect(() => {
    if (state.redirection && refDivButtons.current) {
      refDivButtons.current.classList.add(hidden);
      refThankYou.current?.classList.remove(hidden);
      refThankYou.current?.classList.add(flex);
      refSummary.current?.classList.add(hidden);
      refSummary.current?.classList.remove(flex);
    }
  }, [refDivButtons, refThankYou, state.redirection, refSummary]);

  return (
    <main className="group/home relative z-0 flex  h-dvh flex-col items-center overflow-x-clip font-ubuntu sm:min-h-screen screen840:justify-center screen840:px-6">
      <div className="flex size-full max-w-[940px] flex-col items-center justify-between rounded-[15px] screen840:h-[600px] screen840:flex-row screen840:bg-white screen840:py-[16px] screen840:pl-[16px]">
        <div className="relative flex h-[172px] w-full justify-center object-cover screen840:block screen840:min-h-[568px] screen840:w-fit screen840:min-w-[274px]">
          <Image
            priority
            className="absolute hidden screen840:block"
            fill
            src={imageSidebarDesktop as string}
            alt="sidebar background image"
          />
          <Image
            priority
            className="absolute object-cover screen840:hidden"
            fill
            src={imageSidebarMobile as string}
            alt="sidebar background image"
          />
          <ul className="relative z-10 mt-[32px] flex h-[228px] gap-[16px] screen840:mt-[40px] screen840:flex-col screen840:gap-[32px] screen840:pl-[32px]">
            {Object.values(items).map((item, index) => (
              <li key={index} className="flex h-[33px] items-center gap-[16px]">
                <Circle index={index} />
                <div className="hidden flex-col screen840:flex">
                  <span className="text-[12px] text-[#ABBCFF]">{titles.step + [index + 1].toString()}</span>
                  <span className="text-[14px] font-bold text-white">{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form
          action={action}
          className="flex size-full h-full flex-col items-center justify-center gap-[24px] screen840:pb-[16px]"
        >
          <div className="flex size-full justify-center">{children}</div>
          <div
            ref={refDivButtons}
            className="flex min-h-[48px] w-full max-w-[450px] items-center justify-between bg-white p-[16px] screen840:bg-none screen840:p-0 "
          >
            <button
              onClick={() => {
                if (
                  refSelectPlan.current &&
                  refSelectPlan.current.classList.contains(selected) &&
                  refYourInfo.current
                ) {
                  refButtonPrevious.current?.classList.add(invisible);
                  refSelectPlan.current.classList.remove(selected);
                  refSelectPlan.current.classList.add(hidden);
                  refSelectPlan.current.classList.remove(flex);
                  refYourInfo.current.classList.add(selected);
                  refYourInfo.current.classList.remove(hidden);
                  refYourInfo.current.classList.add(flex);
                }
                if (refAddons.current && refAddons.current.classList.contains(selected) && refSelectPlan.current) {
                  refAddons.current.classList.remove(selected);
                  refAddons.current.classList.add(hidden);
                  refAddons.current.classList.remove(flex);
                  refSelectPlan.current.classList.add(selected);
                  refSelectPlan.current.classList.remove(hidden);
                  refSelectPlan.current.classList.add(flex);
                }
                if (refSummary.current && refSummary.current.classList.contains(selected) && refAddons.current) {
                  refSummary.current.classList.remove(selected);
                  refSummary.current.classList.add(hidden);
                  refSummary.current.classList.remove(flex);
                  refAddons.current.classList.add(selected);
                  refAddons.current.classList.remove(hidden);
                  refAddons.current.classList.add(flex);
                  refButtonNext.current?.classList.remove(hidden);
                  refButtonConfirm.current?.classList.remove(flex);
                  refButtonConfirm.current?.classList.add(hidden);
                }
              }}
              ref={refButtonPrevious}
              type="button"
              className={`invisible w-[60px] text-[#9699AA] screen840:h-[18px]`}
            >
              {titles.buttonPrevious}
            </button>
            <button
              ref={refButtonNext}
              onClick={() => {
                if (refYourInfo.current && refYourInfo.current.classList.contains(selected) && refSelectPlan.current) {
                  let error = false;
                  if (refTel.current?.value === '') {
                    if (refTelError.current) refTelError.current.textContent = errorMessages.fieldRequired;
                    refTel.current.classList.add(errorInput);
                    refTel.current.focus();
                    error = true;
                  } else if (refTel.current) {
                    let telFormatted = refTel.current.value;
                    telFormatted = formatNumber(telFormatted);
                    if (!/^\d{7,15}$/.test(telFormatted)) {
                      if (refTelError.current) refTelError.current.textContent = errorMessages.invalidTel;
                      refTel.current.classList.add(errorInput);
                      refTel.current.focus();
                      error = true;
                    }
                  }
                  if (refMail.current && refMail.current.value === '') {
                    if (refMailError.current) refMailError.current.textContent = errorMessages.fieldRequired;
                    refMail.current.classList.add(errorInput);
                    refMail.current.focus();
                    error = true;
                  } else if (
                    refMail.current &&
                    !/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(refMail.current.value)
                  ) {
                    if (refMailError.current) refMailError.current.textContent = errorMessages.invalidEmail;
                    refMail.current.classList.add(errorInput);
                    refMail.current.focus();
                    error = true;
                  }
                  if (refName.current && refName.current.value === '') {
                    if (refNameError.current) refNameError.current.textContent = errorMessages.fieldRequired;
                    refName.current.classList.add(errorInput);
                    refName.current.focus();
                    error = true;
                  }
                  if (error) return;
                  refButtonPrevious.current?.classList.remove(invisible);
                  refYourInfo.current.classList.remove(selected);
                  refYourInfo.current.classList.add(hidden);
                  refYourInfo.current.classList.remove(flex);
                  refSelectPlan.current.classList.add(selected);
                  refSelectPlan.current.classList.remove(hidden);
                  refSelectPlan.current.classList.add(flex);
                } else if (refSelectPlan.current?.classList.contains(selected) && refAddons.current) {
                  refSelectPlan.current.classList.remove(selected);
                  refSelectPlan.current.classList.add(hidden);
                  refSelectPlan.current.classList.remove(flex);
                  refAddons.current.classList.add(selected);
                  refAddons.current.classList.remove(hidden);
                  refAddons.current.classList.add(flex);
                } else if (refAddons.current?.classList.contains(selected) && refSummary.current) {
                  refAddons.current.classList.remove(selected);
                  refAddons.current.classList.add(hidden);
                  refAddons.current.classList.remove(flex);
                  refSummary.current.classList.add(selected);
                  refSummary.current.classList.remove(hidden);
                  refSummary.current.classList.add(flex);
                  refButtonNext.current?.classList.add(hidden);
                  refButtonConfirm.current?.classList.remove(hidden);
                  refButtonConfirm.current?.classList.add(flex);
                }
              }}
              type="button"
              className="h-[48px] w-[123px] rounded-[8px] bg-[#022959] text-white"
            >
              {titles.buttonNext}
            </button>
            <SubmitButton refButtonConfirm={refButtonConfirm} />
          </div>
        </form>
      </div>
    </main>
  );
}
