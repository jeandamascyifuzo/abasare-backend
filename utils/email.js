// @ts-nocheck
import nodemailer from "nodemailer"
import bcrypt from 'bcryptjs';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
  })

  const emailOptions = {
    from: "Abasare <jeancyifuzodamas@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  }
  await transporter.sendMail(emailOptions)
}

const hashPassword = (password) => bcrypt.hashSync(password, 10);
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

export {
  sendEmail,
  hashPassword,
  comparePassword
}

