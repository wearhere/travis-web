Travis.EncryptConfigView = Em.View.extend
  templateName: 'encrypt_config'
  elementId: 'encrypt-config'
  classNames: ['popup']
  classNameBindings: ['display']

  repoBinding:  'toolsView.repo'
  buildBinding: 'toolsView.build'
  jobBinding:   'toolsView.job'
  branchesBinding: 'repo.branches'

  didInsertElement: ->
    @_super.apply(this, arguments)
    @show()

  show: ->
    @set('display', true)

  close: ->
    @destroy()
