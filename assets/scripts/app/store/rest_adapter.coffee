require 'travis/ajax'
require 'models'

@Travis.RestAdapter = DS.RESTAdapter.extend
  mappings:
    broadcasts:   Travis.Broadcast
    repositories: Travis.Repo
    repository:   Travis.Repo
    repos:        Travis.Repo
    repo:         Travis.Repo
    builds:       Travis.Build
    build:        Travis.Build
    commits:      Travis.Commit
    commit:       Travis.Commit
    jobs:         Travis.Job
    job:          Travis.Job
    account:      Travis.Account
    accounts:     Travis.Account
    worker:       Travis.Worker
    workers:      Travis.Worker

  plurals:
    repositories: 'repositories',
    repository: 'repositories',
    repo:       'repos',
    repos:      'repos',
    build:      'builds'
    branch:     'branches'
    job:        'jobs'
    worker:     'workers'
    profile:    'profile'

  ajax: ->
    Travis.ajax.ajax.apply(this, arguments)

@Travis.RestAdapter.map 'Travis.Branch',
  repoId: { key: 'repository_id' }

@Travis.RestAdapter.map 'Travis.Build',
  repoId:    { key: 'repository_id' }
  _duration: { key: 'duration'      }
  repo:      { key: 'repository_id' }
  jobs:      { key: 'job_ids'       }

@Travis.RestAdapter.map 'Travis.Commit',
  build: { key: 'buildId' }

@Travis.RestAdapter.map 'Travis.Event',
  repoId: { key: 'repository_id' }
  sourceId: { key: 'source_id' }
  sourceType: { key: 'source_type' }

@Travis.RestAdapter.map 'Travis.Job',
  repoId:    { key: 'repository_id' }
  _duration: { key: 'duration'      }
  repo:      { key: 'repository_id' }
