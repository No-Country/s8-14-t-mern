import { readFileSync } from 'fs'
import Handlebars from 'handlebars'
import * as nodemailer from 'nodemailer'
import path from 'path'
import config from '../config'
import { currentDate } from './helpers'

const Project = {
  URL_FRONTEND: process.env.FRONTEND_URL || 'http://localhost:3000',
  NAME_PROJECT: 'Pigmeo',
  LOGO: 'https://res.cloudinary.com/dftu7s8cf/image/upload/v1685387399/pigmeo/logo-light.png',
  FROM: function () {
    return `${this.NAME_PROJECT} <${this.NAME_PROJECT}-mern@gmail.com>`
  }
}

enum templateFiles {
  RESET_PSW = 'forgotPassword.hbs',
  CONFIRM = 'confirmAccount.hbs',
  MYTRANSF = 'transferSent.hbs',
  RECERANSF = 'transferReceiver.hbs',
  DEPOSIT = 'deposit.hbs'
}

const initTransport = () => {
  const transport = nodemailer.createTransport(config.transportOptions)
  transport.verify((error, success) => {
    if (error) return console.error(error)
    console.log('Server is ready to take our messages', success)
  })
  return transport
}

const generateHbsTemplate = (fileHbs: string, data: object) => {
  const template = readFileSync(
    path.join(__dirname, `./templatesEmail/${fileHbs}`),
    'utf8'
  )
  const contextData = {
    ...data,
    projectName: Project.NAME_PROJECT,
    logo: Project.LOGO
  }
  const compiled = Handlebars.compile(template)
  return compiled(contextData)
}

export const sendVerifyMail = async (
  email: string,
  firstname: string,
  token: string
) => {
  const transport = initTransport()
  const data = {
    firstname,
    confirmationUrl: `${Project.URL_FRONTEND}/confirmar/${token}`
  }
  const htmlContent = generateHbsTemplate(templateFiles.CONFIRM, data)

  await transport.sendMail({
    from: Project.FROM(),
    to: email,
    subject: 'Comprueba tu cuenta',
    text: 'Comprueba tu cuenta',
    html: htmlContent
  })
}

export const sendMailForgotPassword = async (
  email: string,
  firstname: string,
  token: string
) => {
  const transport = initTransport()
  const data = {
    firstname,
    confirmationUrl: `${Project.URL_FRONTEND}/olvide-password/${token}`
  }
  const htmlContent = generateHbsTemplate(templateFiles.RESET_PSW, data)

  await transport.sendMail({
    from: Project.FROM(),
    to: email,
    subject: 'Reestablece tu contraseña',
    text: 'Reestablece tu contraseña',
    html: htmlContent
  })
}

export const sendMailMyTransfer = async (
  fullNameReceiver: string,
  amount: number,
  emailSender: string,
  aliasReceiver: string
) => {
  const transport = initTransport()
  const data = {
    fullNameReceiver,
    amount,
    aliasReceiver
  }
  const htmlContent = generateHbsTemplate(templateFiles.MYTRANSF, data)

  await transport.sendMail({
    from: Project.FROM(),
    to: emailSender,
    subject: 'Transferencia realizada',
    text: 'Transferencia realizada',
    html: htmlContent
  })
}

export const sendMailReceiverTransfer = async (
  fullNameSender: string,
  amount: number,
  emailSender: string,
  emailReceiver: string
) => {
  const transport = initTransport()
  const data = {
    fullNameSender,
    amount,
    emailSender
  }
  const htmlContent = generateHbsTemplate(templateFiles.RECERANSF, data)

  await transport.sendMail({
    from: Project.FROM(),
    to: emailReceiver,
    subject: 'Recibiste una transferencia',
    text: 'Recibiste una transferencia',
    html: htmlContent
  })
}

export const sendMailDeposit = async (email: string, amount: number) => {
  const transport = initTransport()
  const data = {
    amount,
    fecha: currentDate()
  }
  const htmlContent = generateHbsTemplate(templateFiles.DEPOSIT, data)
  await transport.sendMail({
    from: Project.FROM(),
    to: email,
    subject: 'Realizaste un deposito',
    text: 'Realizaste un deposito',
    html: htmlContent
  })
}
