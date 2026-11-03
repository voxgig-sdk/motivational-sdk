-- Motivational SDK error

local json = require("dkjson")

local MotivationalError = {}
MotivationalError.__index = MotivationalError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function MotivationalError.new(code, msg, ctx)
  local self = setmetatable({}, MotivationalError)
  self.is_sdk_error = true
  self.sdk = "Motivational"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function MotivationalError:context()
  return CONTEXT[self]
end


function MotivationalError:error()
  return self.msg
end


function MotivationalError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function MotivationalError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function MotivationalError:to_json()
  return json.encode(self:to_table())
end


function MotivationalError:__tostring()
  return self.msg
end


function MotivationalError.__tojson(self)
  return self:to_json()
end


return MotivationalError
