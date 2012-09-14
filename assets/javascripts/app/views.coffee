require 'ext/ember/namespace'

@Travis.reopen
  View: Em.View.extend()

@Travis.reopen
  ProfileLayout:   Travis.View.extend(templateName: 'layouts/profile')
  StatsLayout:     Travis.View.extend(templateName: 'layouts/simple')
  AuthLayout:      Travis.View.extend(templateName: 'layouts/simple')
  AuthView:        Travis.View.extend(templateName: 'auth/show')
  ApplicationView: Travis.View.extend(templateName: 'layouts/home')

require 'views/build'
require 'views/job'
require 'views/repo'
require 'views/profile'
require 'views/sidebar'
require 'views/stats'
require 'views/top'

