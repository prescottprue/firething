import { useAnalytics } from 'reactfire'
import { version } from '../../../package.json'

/**
 * From https://firebase.google.com/docs/reference/js/firebase.analytics.html?authuser=0#event-name-string
 */
const GOOGLE_EVENT_TYPES_BY_EVENT_NAME = {
  login: 'login',
  signup: 'sign_up',
  page: 'screen_view',
  search: 'search',
  exception: 'exception'
}

export default function useSetupAnalytics() {
  const analytics = useAnalytics()

  /**
   * Trigger analytics event within Firebase Analytics
   * @param {Object} eventData - Data associated with the event.
   */
  function triggerAnalyticsEvent(eventName, eventData) {
    const eventDataWithVersion = { ...eventData, version }
    if (!window.Cypress) {
      const standardizedEventName =
        GOOGLE_EVENT_TYPES_BY_EVENT_NAME[eventName] || eventName
      analytics.logEvent(standardizedEventName, eventDataWithVersion)
    } else {
      /* eslint-disable no-console */
      console.debug('Analytics Event:', {
        name: eventName,
        data: eventDataWithVersion
      })
      /* eslint-enable no-console */
    }
  }
  return {
    setAnalyticsUser,
    triggerAnalyticsEvent
  }
}