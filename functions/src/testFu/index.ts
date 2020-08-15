import * as functions from 'firebase-functions'

interface testFuData {
  [k: string]: any
}
interface testFuResponse {
  message: string
}

/**
 * Handle testFu onCall HTTP request
 *
 * @param {object} data - Data passed into httpsCallable by client
 * @param {functions.https.CallableContext} context - Function event context
 * @param {object} context.auth - Cloud function context
 * @param {object} context.auth.uid - UID of user that made the request
 * @returns {Promise} Resolves after handling request
 */
export async function testFuRequest(
  data: testFuData,
  context: functions.https.CallableContext
): Promise<testFuResponse> {
  console.log('request received', { data, context })
  // Return data back to client to end function execution
  return { message: 'Hello World' }
}

/**
 * Cloud Function triggered by HTTP request
 *
 * Trigger: `HTTPS - onCall`
 *
 * @name testFu
 * @type {functions.CloudFunction}
 */
export default functions.https.onCall(testFuRequest)
