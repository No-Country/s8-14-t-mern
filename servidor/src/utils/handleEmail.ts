import * as nodemailer from 'nodemailer'
import config from '../config'

const URL_FRONTEND = 'http://localhost:3000'
const NAME_PROJECT = 'Pigmeo'

export const sendVerifyMail = async (
  email: string,
  firstname: string,
  token: string
) => {
  const transport = nodemailer.createTransport(config.transportOptions)

  await transport.sendMail({
    from: `${NAME_PROJECT} <${NAME_PROJECT}-mern@gmail.com>`,
    to: email,
    subject: 'Comprueba tu cuenta',
    text: 'Comprueba tu cuenta',
    html: `
		<h3>¡Hola <b>${firstname}!</b></h3>
		<p>Te damos la bienvenida a tu billetera ${NAME_PROJECT}. Valida tu cuenta clickeando el enlace:</p>
		<a href="${URL_FRONTEND}/confirmar/${token}">Comprobar cuenta</a>
		<p>Si usted no ha creado esta cuenta, puede ignorar este correo.</p>
	`
  })
}

export const sendMailForgotPassword = async (
  email: string,
  firstname: string,
  token: string
): Promise<void> => {
  const transport = nodemailer.createTransport(config.transportOptions)

  await transport.sendMail({
    from: `${NAME_PROJECT} <${NAME_PROJECT}-mern@gmail.com>`,
    to: email,
    subject: 'Reestablece tu contraseña',
    text: 'Reestablece tu contraseña',
    html: `
		<h3>¡Hola <b>${firstname}!</b></h3>
		<p>Has solicitado reestablecer tu contraseña.</p>
    <p>Sigue el siguiente enlace para generar una nueva contraseña: </p>
		<a href="${URL_FRONTEND}/olvide-password/${token}">Reestablecer contraseña</a>
		<p>Si usted no ha solicitado este proceso, puede ignorar este correo.</p>
	`
  })
}
