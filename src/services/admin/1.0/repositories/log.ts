import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import config from 'common/config'
import DBLog from './models/log'

export const insert = async function( props ) {
  await insertLog( props )
  insertGoogleAnalytics( props )
}

async function insertLog( props ){
  const { endpoint, userId, agent } = props
  const model = new DBLog()

  model.endpoint = endpoint
  model.user = userId
  model.agent = agent
  model.created = new Date()

  try{
      const resp = await model.save()
      //console.log("LOG", "INSERT", resp)
  } catch(ex){
    console.log("ERROR", "LOG", "INSERT", ex)
    return null
  }  
}

function insertGoogleAnalytics( props ){
  const { endpoint, userId, agent } = props

  const analytics = Analytics({
    app: 'labs',
    version: config.VERSION,
    plugins: [
      googleAnalytics({
        trackingId: config.PLUGINS.GOOGLE_ANALYTICS.TRACK_ID,
      }),
    ]
  })

  const page = {
    title: `server: ${endpoint}`,
    href: `${config.PLUGINS.GOOGLE_ANALYTICS.BASE_URL}${endpoint}`,
    path: endpoint
  }

  analytics.page( page )
}