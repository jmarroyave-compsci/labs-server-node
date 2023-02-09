import CONFIG from 'common/config'
import sendgrid from '@sendgrid/mail'

export async function sendMail( params ){
  const { to, from, subject, bodyText, bodyHTML } = params 

  sendgrid.setApiKey(CONFIG.PLUGINS.SENDGRID.KEY)

  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: bodyText,
    html: bodyHTML ?? bodyText,
  }

  //console.log("SENDGRID", "sending mail", msg)

  try{
    await sendgrid.send(msg)  
  } catch(ex){
    console.log("ERROR", "SENDGRID", JSON.stringify(ex, null, 2))
  }  
}

