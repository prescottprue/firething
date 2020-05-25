import React from 'react'
import PropTypes from 'prop-types'
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'
import { BrowserRouter as Router } from 'react-router-dom'
import NotificationsProvider from 'modules/notification/NotificationsProvider'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import SetupMessaging from 'components/SetupMessaging'
import SetupFirestore from 'components/SetupFirestore'
import ThemeSettings from '../../theme'

const theme = createMuiTheme(ThemeSettings)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

// Enable Real Time Database emulator if environment variable is set
if (process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST) {
  firebaseConfig.databaseURL = `http://${process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST}?ns=${firebaseConfig.projectId}`
  console.debug(`RTDB emulator enabled: ${firebaseConfig.databaseURL}`) // eslint-disable-line no-console
}

function App({ routes }) {
  return (
    <MuiThemeProvider theme={theme}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig} initPerformance>
        <NotificationsProvider>
          <>
            <Router>{routes}</Router>
            <SuspenseWithPerf traceId="setup-firestore">
              <SetupFirestore />
            </SuspenseWithPerf>
            <SuspenseWithPerf traceId="setup-messaging">
              <SetupMessaging />
            </SuspenseWithPerf>
          </>
        </NotificationsProvider>
      </FirebaseAppProvider>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  routes: PropTypes.object.isRequired
}

export default App
