'use client';
import { useContext } from 'react';
import { DataContext } from '@/app/_providers/DataContext';
export default function YourInfo() {
  const { refYourInfo, refName, refMail, refTel, refNameError, refMailError, refTelError } = useContext(DataContext);
  const items = {
    title: 'Personal info',
    description: 'Please provide your name, email address, and phone number.',
    fields: {
      field1: {
        id: 'name',
        ref: refName,
        refError: refNameError,
        label: 'Name',
        placeholder: 'e.g. Stephen King',
        type: 'text',
      },
      field2: {
        id: 'email',
        ref: refMail,
        refError: refMailError,
        label: 'Email Address',
        placeholder: 'e.g. stephenking@lorem.com',
        type: 'email',
      },
      field3: {
        id: 'tel',
        ref: refTel,
        refError: refTelError,
        label: 'Phone Number',
        placeholder: 'e.g. +1 234 567 890',
        type: 'tel',
      },
    },
  };
  return (
    <div ref={refYourInfo} className="yourInfo selected mainComponent flex">
      <header className="flex h-[68px] flex-col gap-[11px]">
        <h1>{items.title}</h1>
        <p className="titleDescription">{items.description}</p>
      </header>
      <ul className="flex w-full flex-col gap-[24px]">
        {Object.values(items.fields).map((field) => (
          <li className="inputDiv" key={field.id}>
            <div className="flex items-center justify-between">
              <label htmlFor={field.id}>{field.label}</label>
              <span ref={field.refError} className="text-[14px] font-bold text-[#EE374A]"></span>
            </div>
            <input
              onChange={() => {
                if (field.ref.current) field.ref.current.classList.remove('errorInput');
                if (field.refError.current) field.refError.current.textContent = '';
              }}
              ref={field.ref}
              id={field.id}
              name={field.id}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
