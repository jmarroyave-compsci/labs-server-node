import CONFIG from 'common/config'
import sendgrid from '@sendgrid/mail'

export async function sendMail( params ){
  const { to, from, subject, bodyText, bodyHTML } = params 
  sgMail.setApiKey(CONFIG.PLUGGINS.SENDGRID.KEY)

  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: bodyText,
    html: bodyHTML ?? bodyText,
  }

  try{
    await sgMail.send(msg)  
  } catch(ex){
    console.log("ERROR", "SENDGRID", ex)
  }  
}

