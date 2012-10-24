require 'travis/model'

@Travis.Event = Travis.Model.extend
  event:     DS.attr('string')
  repoId:    DS.attr('number')
  sourceId:  DS.attr('number')
  sourceType:  DS.attr('string')
  createdAt: DS.attr('string')

  event_: (->
    @get('event')
  ).property('event')

  result: (->
    @get('data.data.result')
  ).property('data.data.result')

  message: (->
    @get('data.data.message')
  ).property('data.data.message')

  source: (->
    Travis[type].find(@get('sourceId')) if type = @get('sourceType')
  ).property('sourceType', 'sourceId')

@Travis.Event.reopenClass
  byRepoId: (id) ->
    @find repository_id: id
