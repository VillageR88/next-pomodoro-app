'use server';

import nodemailer from 'nodemailer';

export async function CreateInvoiceContactForm(
  prev: { number: number; redirection: boolean },
  formData: FormData,
  sum: number,
): Promise<{ number: number; redirection: boolean }> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  if (!process.env.EMAIL) return prev;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const billing = formData.get('billing') as string;
  const onlineService = formData.get('onlineService') as string;
  const largerStorage = formData.get('largerStorage') as string;
  const customizableProfile = formData.get('customizableProfile') as string;
  let queryType = formData.get('queryType') as string;
  queryType = queryType[0].toUpperCase() + queryType.slice(1);
  const htmlContentLine1 = `Hello ${name}<br/><br/>`;
  const appendix = onlineService || largerStorage || customizableProfile ? ' with the following options:' : '';
  const htmlContentLine2 = `You have selected the ${queryType} plan${appendix}<br/>`;
  const htmlContentLine3 = onlineService ? '- online service<br/>' : '';
  const htmlContentLine4 = largerStorage ? '- larger storage<br/> ' : '';
  const htmlContentLine5 = customizableProfile ? '- customizable profile<br/> ' : '';
  const htmlContentLine6 = `for a total of ${sum.toString() + '$ per'} ${billing ? 'year' : 'month.'}<br/><br/>`;
  const htmlContentLine7 = `Thank you for contacting us. We will get back to you as soon as possible.<br/><br/> If you received this email by mistake, please ignore it.<br/><br/>Best regards,<br/><br/><a href="https://www.frontendmentor.io/profile/VillageR88">VillageR88</a><br/>`;
  const htmlContent =
    htmlContentLine1 +
    htmlContentLine2 +
    htmlContentLine3 +
    htmlContentLine4 +
    htmlContentLine5 +
    htmlContentLine6 +
    htmlContentLine7;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Contact Form',
    html: htmlContent,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('there was an error: ', err);
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
  return { number: prev.number + 1, redirection: true };
}
