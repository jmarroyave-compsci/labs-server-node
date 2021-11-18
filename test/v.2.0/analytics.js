const config = require('../config');
const utils = require('../utils');
const Analytics = require('analytics')
const googleAnalytics = require('@analytics/google-analytics')
const googleTagManager = require('@analytics/google-tag-manager')

const chai = require('chai');
const chaiResponseValidator = require('chai-openapi-response-validator');
const path = require('path');
const expect = chai.expect;

describe('verify google analytics', () => {
  it('should add records to GA', async () => {

    const analytics = Analytics.default({
      app: 'labs',
      version: config.VERSION,
      plugins: [
        googleAnalytics.default({
          trackingId: config.PLUGINS_GOOGLE_ANALYTICS_TRACK_ID,
        }),
        googleTagManager({
          containerId: 'GTM-123xyz'
        }),
      ]
    })

    const page = {
      title: `server: test`,
      href: `${config.PLUGINS_GOOGLE_ANALYTICS_BASE_URL}`,
      path: "/"
    }


    var data = await analytics.page( page )

    console.log(data)

    data = await analytics.track('userPurchase', {
      price: 20,
      item: 'pink socks',
    })

    console.log(data)

    data = await analytics.identify('user-id-xyz', {
      firstName: 'bill',
      lastName: 'murray',
      email: 'da-coolest@aol.com'
    })

    console.log(data)

  });
});


