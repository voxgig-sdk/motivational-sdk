
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MotivationalSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MotivationalSDK.test()
    equal(testsdk instanceof MotivationalSDK, true,
      'MotivationalSDK.test() must return a client synchronously')
  })

})
