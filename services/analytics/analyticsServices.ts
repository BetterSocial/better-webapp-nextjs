'use client'

import { BetterSocialEventTracking } from "analytics/analyticsEventTracking"

const sendAnalytics = (event: BetterSocialEventTracking, data?: object) => {
  fetch('/api/send-analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event,
      data
    })
  })
}

export { sendAnalytics }