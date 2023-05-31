import { readFileSync } from 'fs'
import Handlebars from 'handlebars'
import * as nodemailer from 'nodemailer'
import path from 'path'
import config from '../config'

enum Project {
  URL_FRONTEND = 'http://localhost:3000',
  NAME_PROJECT = 'Pigmeo'
}
enum templateFiles {
  RESET_PSW = 'forgotPassword.hbs',
  CONFIRM = 'confirmAccount.hbs',
  MYTRANSF = 'transferSent.hbs'
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
    logo: 'https://res.cloudinary.com/dftu7s8cf/image/upload/v1685387399/pigmeo/logo-light.png'
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
    from: `${Project.NAME_PROJECT} <${Project.NAME_PROJECT}-mern@gmail.com>`,
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
    from: `${Project.NAME_PROJECT} <${Project.NAME_PROJECT}-mern@gmail.com>`,
    to: email,
    subject: 'Reestablece tu contraseña',
    text: 'Reestablece tu contraseña',
    html: htmlContent
  })
}

export const sendMailMyTransfer = async (
  addresse: string,
  amount: string,
  email: string,
  cbu: number,
  dni: number
) => {
  const transport = initTransport()
  const data = {
    addresse,
    amount,
    cbu,
    dni
  }
  const htmlContent = generateHbsTemplate(templateFiles.MYTRANSF, data)

  await transport.sendMail({
    from: `${Project.NAME_PROJECT} <${Project.NAME_PROJECT}-mern@gmail.com>`,
    to: email,
    subject: 'Transferencia realizada',
    text: 'Transferencia realizada',
    html: htmlContent
  })
}
