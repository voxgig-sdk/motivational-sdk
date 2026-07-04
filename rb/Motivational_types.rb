# frozen_string_literal: true

# Typed models for the Motivational SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Language entity data model.
#
# @!attribute [rw] author
#   @return [String]
#
# @!attribute [rw] phrase
#   @return [String]
#
# @!attribute [rw] religion
#   @return [Integer]
Language = Struct.new(
  :author,
  :phrase,
  :religion,
  keyword_init: true
)

# Request payload for Language#list.
#
# @!attribute [rw] language
#   @return [String]
LanguageListMatch = Struct.new(
  :language,
  keyword_init: true
)

