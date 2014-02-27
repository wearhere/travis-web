require 'travis/model'

@Travis.Request = Travis.Model.extend
  id:                Ember.attr('string')
  created_at:        Ember.attr('string')
  event_type:        Ember.attr('string')
  result:            Ember.attr('string')
  message:           Ember.attr('string')
  headCommit:        Ember.attr('string')
  baseCommit:        Ember.attr('string')
  branchName:        Ember.attr('string', key: 'branch')
  tagName:           Ember.attr('string', key: 'tag')
  pullRequest:       Ember.attr('boolean')
  pullRequestTitle:  Ember.attr('string')
  pullRequestNumber: Ember.attr(Number)

  repo:   Ember.belongsTo('Travis.Request', key: 'repository_id')
  commit: Ember.belongsTo('Travis.Commit', key: 'commit_id')
