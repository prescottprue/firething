import testFu from './index'

describe('testFu HTTPS Callable Cloud Function', () => {
  it('responds with hello message when sent an empty request', async () => {
    const data = {}
    const context = {}
    // Invoke request handler with fake data + context objects
    const response = await testFu(data, context)
    // Confirm no error is thrown
    expect(err).to.not.exist
    // Confirm response contains message
    expect(response).to.have.property('message', 'Hello World')
  })
})
