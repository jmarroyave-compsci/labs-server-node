import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import config from '../config'

export const saveGuest = async function( req ) {
  //if( config.LOCAL ) return;

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
    title: `server: ${req.path}`,
    href: `${config.PLUGINS.GOOGLE_ANALYTICS.BASE_URL}${req.path}`,
    path: req.path
  }

  //console.log(page)

  analytics.page( page )

  /*
  analytics.track('userPurchase', {
    price: 20,
    item: 'pink socks',
  })

  analytics.identify('user-id-xyz', {
    firstName: 'bill',
    lastName: 'murray',
    email: 'da-coolest@aol.com'
  })
  */

};


