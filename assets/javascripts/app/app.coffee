require 'travis' # hrm.
require 'controllers'
require 'helpers'
require 'models'
require 'pusher'
require 'routes'
require 'store'
require 'templates'
require 'views'

require 'config/locales'
require 'data/sponsors'

# $.mockjaxSettings.log = false
# Ember.LOG_BINDINGS = true
# Ember.ENV.RAISE_ON_DEPRECATION = true
Pusher.log = -> console.log(arguments)

Travis.reopen
  App: Em.Application.extend
    initialize: ->
      @_super()

    init: ->
      @_super()

      @store = Travis.Store.create()
      @store.loadMany(Travis.Sponsor, Travis.SPONSORS)

      @pusher = new Travis.Pusher()

      @setCurrentUser(JSON.parse($.cookie('user')))

    signIn: ->
      # Travis.Auth.signIn()
      @setCurrentUser({ id: 1, login: 'svenfuchs', name: 'Sven Fuchs', email: 'me@svenfuchs.com', token: '1234567890', gravatar: '402602a60e500e85f2f5dc1ff3648ecb', locale: 'en' })
      @render.apply(this, @get('returnTo') || ['home', 'index'])

    signOut: ->
      @setCurrentUser()

    setCurrentUser: (user) ->
      user = JSON.parse(user) if typeof user == 'string'
      $.cookie('user', JSON.stringify(user))
      @store.load(Travis.User, user) if user
      @set('currentUser', if user then Travis.User.find(user.id) else undefined)

    render: (name, action, params) ->
      layout = @connectLayout(name)
      layout.activate(action, params || {})
      $('body').attr('id', name)

    receive: ->
      @store.receive.apply(@store, arguments)

    toggleSidebar: ->
      $('body').toggleClass('maximized')
      # TODO gotta force redraws here :/
      element = $('<span></span>')
      $('#top .profile').append(element)
      Em.run.later (-> element.remove()), 10
      element = $('<span></span>')
      $('#repository').append(element)
      Em.run.later (-> element.remove()), 10

