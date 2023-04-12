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

export async function get( props ){
  const { endpoint, userId, agent } = props
  try{
    const resp = DBLog.find({})
    return resp
  } catch(ex){
    console.log("ERROR", "LOG", "GET", ex)
    return null
  }  
}


export async function count( params ){
  const { d=null } = params

  const filter = {}
  if( d != null ){
    const d1 = new Date(d)
    const d0 = new Date(d1.getTime())
    d1.setDate( d1.getDate() + 1)
    filter['created'] = { $gte: d0.toISOString(), $lt: d1.toISOString() }
  }

  //console.log(filter)

  try{
    const resp = DBLog.count(filter)
    return resp
  } catch(ex){
    console.log("ERROR", "LOG", "GET", ex)
    return { error : ex.toString() }
  }  
}
