import * as firebaseTesting from '@firebase/testing'
import myFuOriginal from './index'

const adminApp = firebaseTesting.initializeAdminApp({
  projectId: process.env.GCLOUD_PROJECT,
  databaseName: process.env.GCLOUD_PROJECT
})

const eventPath = 'users'

const myFu = functionsTest.wrap(myFuOriginal)

describe('myFu Firestore Cloud Function (onWrite)', () => {
  beforeEach(async () => {
    // Clean database before each test
    await firebaseTesting.clearFirestoreData({
      projectId: process.env.GCLOUD_PROJECT
    })
  })

  after(async () => {
    // Restoring stubs to the original methods
    functionsTest.cleanup()
    // Cleanup all apps (keeps active listeners from preventing JS from exiting)
    await Promise.all(firebaseTesting.apps().map((app) => app.delete()))
  })

  it('handles event', async () => {
    const eventData = { some: 'value' }
    const beforeData = { another: 'thing' }
    // Build create change event
    const beforeSnap = functionsTest.firestore.makeDocumentSnapshot(
      beforeData,
      'document/path'
    )
    const afterSnap = functionsTest.firestore.makeDocumentSnapshot(
      eventData,
      eventPath
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    const fakeContext = {
      params: {}
    }
    await myFu({ after: snap }, fakeContext)
    // TODO: Switch this to a real assertion which confirms functionality
    const result = await adminApp.firestore().doc('some/path').get()
    expect(result).to.be.null``
  })
})
