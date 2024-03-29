const CONFIG = require('common/config').default;

const Analytics = require('analytics')
const googleAnalytics = require('@analytics/google-analytics')
const googleTagManager = require('@analytics/google-tag-manager')

const chai = require('chai');
const expect = chai.expect;

describe('services: admin/analytics', () => {
  it('should add records to GA', async () => {

    const analytics = Analytics.default({
      app: 'labs',
      version: CONFIG.VERSION,
      plugins: [
        googleAnalytics.default({
          trackingId: CONFIG.PLUGINS.GOOGLE_ANALYTICS.TRACK_ID,
        }),
        googleTagManager({
          containerId: 'GTM-123xyz'
        }),
      ]
    })

    const page = {
      title: `server: test`,
      href: `${CONFIG.PLUGINS.GOOGLE_ANALYTICS.BASE_URL}`,
      path: "/"
    }


    var data = await analytics.page( page )

    //console.log(data)

    data = await analytics.track('userPurchase', {
      price: 20,
      item: 'pink socks',
    })

    //console.log(data)

    data = await analytics.identify('user-id-xyz', {
      firstName: 'bill',
      lastName: 'murray',
      email: 'da-coolest@aol.com'
    })

    //console.log(data)

  });
});