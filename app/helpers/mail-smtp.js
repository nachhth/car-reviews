'use strict';

const { func } = require('joi');
const nodemailer = require('nodemailer');

const { SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

async function sendMailRegister(name, email, code) {
  // generar el link de activation
  const linkActivation = `https://localhost:3000/api/v1/users/activation?code=${code}`; // ESTO TIENE QUE ESTAR EN EL .env Y NO ACÁ

  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: 'Welcome to ReviewsCars App',
    text: `Hi ${name}, to confirm account go to this link: ${linkActivation}`,
    html: `Hi ${name}, to confirm account <a href='${linkActivation}'>click here</a>`,
  };

  const data = await transporter.sendMail(mailData);
  return data;
}

async function sendMailCorrectValidation(name, email) {
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: '[ReviewsCars] Account activated',
    text: `Hi ${name}, your account was activated`,
    html: `<h1>Hi ${name},</h1> your account was activated`,
  };

  const data = await transporter.sendMail(mailData);
  return data;
}

module.exports = {
  sendMailRegister,
  sendMailCorrectValidation,
};
