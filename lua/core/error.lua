-- Motivational SDK error

local MotivationalError = {}
MotivationalError.__index = MotivationalError


function MotivationalError.new(code, msg, ctx)
  local self = setmetatable({}, MotivationalError)
  self.is_sdk_error = true
  self.sdk = "Motivational"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MotivationalError:error()
  return self.msg
end


function MotivationalError:__tostring()
  return self.msg
end


return MotivationalError
