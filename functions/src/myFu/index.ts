import * as functions from 'firebase-functions'

/**
 * Handle Firestore onWrite event
 *
 * @param {functions.Change} change - Function change interface containing state objects
 * @param {admin.firestore.DataSnapshot} change.before - State prior to the event.
 * @param {admin.firestore.DataSnapshot} change.after - State after the event.
 * @param {functions.EventContext} context - Function event context
 * @param {object} context.auth - Authentication information for the user that triggered the function
 * @returns {Promise} Resolves after handle event
 */
async function myFuEvent(change, context) {
  const { params, timestamp } = context
  const { before, after } = change

  console.log('myFu onWrite event:', {
    before: before.data(),
    after: after.data(),
    params,
    timestamp
  })

  // End function execution by returning
  return null
}

/**
 * Cloud Function triggered by Firestore onWrite Event
 *
 * Trigger: `Firestore - onWrite`
 *
 * @name myFu
 * @type {functions.CloudFunction}
 */
export default functions.firestore.document('myFu/{docId}').onWrite(myFuEvent)
