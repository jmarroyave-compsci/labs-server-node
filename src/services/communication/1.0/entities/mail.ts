import { sendMail } from '../helpers/sendgrid'

export const send = async function( query, params, session ) {
  if(!params.to) return { error : "parameter missing"}
  if(!params.from) return { error : "parameter missing"}
  if(!params.subject) return { error : "parameter missing"}

  await sendMail({
    to: params.to,
    from: params.from,
    subject: params.subject,
    bodyText: params.bodyText,
    bodyHTML: params.bodyHTML,
  })
};


