package = "voxgig-sdk-motivational"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/motivational-sdk.git"
}
description = {
  summary = "Motivational SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["motivational_sdk"] = "motivational_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
