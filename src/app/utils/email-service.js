import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"The Vehicle Audit" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });
    
    console.log('Email sent to:', to);
    return true;
  } catch (error) {
    console.error('Error sending email to', to, ':', error);
    return false;
  }
};