package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewLanguageEntityFunc func(client *MotivationalSDK, entopts map[string]any) MotivationalEntity

