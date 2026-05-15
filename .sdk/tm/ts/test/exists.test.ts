
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MotivationalSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MotivationalSDK.test()
    equal(null !== testsdk, true)
  })

})
