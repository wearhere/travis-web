require 'controllers'

@Travis.AuthController = Travis.Controller.extend
  name: 'auth'

  activate: (action, params) ->
    # noop
