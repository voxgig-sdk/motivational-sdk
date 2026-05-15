package core

type MotivationalError struct {
	IsMotivationalError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMotivationalError(code string, msg string, ctx *Context) *MotivationalError {
	return &MotivationalError{
		IsMotivationalError: true,
		Sdk:              "Motivational",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MotivationalError) Error() string {
	return e.Msg
}
