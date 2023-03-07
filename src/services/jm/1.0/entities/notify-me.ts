import CONFIG from 'common/config'
import { invoke } from 'common/service'

export async function send( query, params, session ) {
  const parameters = {
    to: CONFIG.SERVICES.JM.NOTIFY_MAIL,
    from: CONFIG.PLUGINS.SENDGRID.SENDER,
    subject: params.subject,
    bodyText: params.body,
  }

  //console.log("NOTIFY ME", parameters)

  /*
  await invoke({
    service: 'communication',
    version: '1.0',
    entity: 'mail',
    operation: 'send',
    params: parameters,
    session: session,
  })
  */
}

