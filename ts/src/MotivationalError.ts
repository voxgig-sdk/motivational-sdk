
import { Context } from './Context'


class MotivationalError extends Error {

  isMotivationalError = true

  sdk = 'Motivational'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  MotivationalError
}

