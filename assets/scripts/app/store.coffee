require 'store/rest_adapter'

DATA_PROXY =
  get: (name) ->
    @savedData[name]

Travis.Store = DS.Store.extend
  revision: 6
  adapter: 'Travis.RestAdapter'

  init: ->
    @_super.apply this, arguments
    @_loadedData = {}

  load: (type, id, hash) ->
    result = @_super.apply this, arguments

    if result && result.clientId
      # I assume that everything that goes through load is complete record
      # representation, incomplete hashes from pusher go through merge()
      record = @findByClientId type, result.clientId
      record.set 'incomplete', false
      record.set 'complete', true
      # setting both incomplete and complete may be weird, but it's easier to
      # work with both values. I need to check if record has already been completed
      # and in order to do that, without having 'complete', I would need to check
      # for incomplete == false, which looks worse

    result

  merge: (type, id, hash) ->
    if hash == undefined
      hash = id
      adapter = Ember.get(this, '_adapter')
      id = adapter.extractId(type, hash)

    id = id + ''

    typeMap     = @typeMapFor(type)
    cidToHash   = @clientIdToHash
    clientId    = typeMap.idToCid[id]

    if clientId != undefined
      if data = cidToHash[clientId]
        # trying to set id here fails, TODO: talk with ember core team to create merge-like function
        delete hash.id
        $.extend(data, hash)
      else
        cidToHash[clientId] = hash

      if record = @recordCache[clientId]
        record.loadedData();
    else
      clientId = @pushHash(hash, id, type)

    if clientId
      @updateRecordArrays(type, clientId);

      { id: id, clientId: clientId };

  receive: (event, data) ->
    [name, type] = event.split(':')

    mappings = @get('_adapter.mappings')
    type = mappings[name]

    if event == 'job:log'
      if job = @find(Travis.Job, data['job']['id'])
        job.appendLog(data['job']['_log'])
    else if data[type.singularName()]
      @_loadOne(this, type, data)
    else if data[type.pluralName()]
      @_loadMany(this, type, data)
    else
      throw "can't load data for #{name}" unless type

  _loadOne: (store, type, json) ->
    root = type.singularName()
    # we get other types of records only on build, it comes with repository
    # attached. I don't want to use store.sideload here as it will not use merge,
    # if we need sideload becasue we have side records with other events it needs to
    # be revised
    if type == Travis.Build && (json.repository || json.repo)
      @loadIncomplete(Travis.Repo, json.repository || json.repo)
    else if type == Travis.Worker && json.worker.payload
      if repo = (json.worker.payload.repo || json.worker.payload.repository)
        @loadIncomplete(Travis.Repo, repo)
      if job = json.worker.payload.job
        @loadIncomplete(Travis.Job, job)
    @loadIncomplete(type, json[root])

  addLoadedData: (type, clientId, hash) ->
    id = hash.id
    @_loadedData[type.toString()] ||= {}
    loadedData = (@_loadedData[type][clientId] ||= [])
    for key of hash
      loadedData.pushObject key unless loadedData.contains(key)

  isDataLoadedFor: (type, clientId, key) ->
    if recordsData = @_loadedData[type.toString()]
      if data = recordsData[clientId]
        data.contains(key)

  loadIncomplete: (type, hash) ->
    result = @merge(type, hash)

    if result && result.clientId
      @addLoadedData(type, result.clientId, hash)
      record = @findByClientId(type, result.clientId)
      unless record.get('complete')
        record.loadedAsIncomplete()

      record

  _loadMany: (store, type, json) ->
    root = type.pluralName()
    @adapter.sideload(store, type, json, root)
    @loadMany(type, json[root])
