(function() {

  describe('on the "build" state', function() {
    beforeEach(function() {
      app('travis-ci/travis-core/builds/1');
      waitFor(reposRendered);
      return runs(function() {
        return waitFor(buildRendered);
      });
    });
    afterEach(function() {
      return window.history.pushState({}, null, '/spec.html');
    });
    return it('displays the expected stuff', function() {
      listsRepos([
        {
          slug: 'travis-ci/travis-hub',
          build: {
            number: 4,
            url: '/travis-ci/travis-hub/builds/4',
            duration: '1 min',
            finishedAt: '-'
          }
        }, {
          slug: 'travis-ci/travis-core',
          build: {
            number: 1,
            url: '/travis-ci/travis-core/builds/1',
            duration: '30 sec',
            finishedAt: '3 minutes ago'
          }
        }, {
          slug: 'travis-ci/travis-assets',
          build: {
            number: 3,
            url: '/travis-ci/travis-assets/builds/3',
            duration: '30 sec',
            finishedAt: 'a day ago'
          }
        }
      ]);
      displaysRepository({
        href: 'http://github.com/travis-ci/travis-core'
      });
      displaysSummary({
        type: 'build',
        id: 1,
        repo: 'travis-ci/travis-core',
        commit: '1234567',
        branch: 'master',
        compare: '0123456..1234567',
        finishedAt: '3 minutes ago',
        duration: '30 sec',
        message: 'commit message 1'
      });
      displaysTabs({
        current: {
          href: '/travis-ci/travis-core'
        },
        builds: {
          href: '/travis-ci/travis-core/builds'
        },
        build: {
          href: '/travis-ci/travis-core/builds/1',
          active: true
        },
        job: {
          hidden: true
        }
      });
      listsJobs({
        table: '#jobs',
        headers: ['Job', 'Duration', 'Finished', 'Rvm'],
        jobs: [
          {
            color: 'green',
            id: 1,
            number: '1.1',
            repo: 'travis-ci/travis-core',
            finishedAt: '3 minutes ago',
            duration: '30 sec',
            rvm: 'rbx'
          }, {
            color: 'red',
            id: 2,
            number: '1.2',
            repo: 'travis-ci/travis-core',
            finishedAt: '2 minutes ago',
            duration: '40 sec',
            rvm: '1.9.3'
          }
        ]
      });
      return listsJobs({
        table: '#allowed_failure_jobs',
        headers: ['Job', 'Duration', 'Finished', 'Rvm'],
        jobs: [
          {
            color: '',
            id: 3,
            number: '1.3',
            repo: 'travis-ci/travis-core',
            finishedAt: '-',
            duration: '-',
            rvm: 'jruby'
          }
        ]
      });
    });
  });

}).call(this);
(function() {

  describe('on the "builds" state', function() {
    beforeEach(function() {
      app('travis-ci/travis-core/builds');
      return waitFor(buildsRendered);
    });
    afterEach(function() {
      return window.history.pushState({}, null, '/spec.html');
    });
    return it('displays the expected stuff', function() {
      listsRepos([
        {
          slug: 'travis-ci/travis-hub',
          build: {
            number: 4,
            url: '/travis-ci/travis-hub/builds/4',
            duration: '1 min',
            finishedAt: '-'
          }
        }, {
          slug: 'travis-ci/travis-core',
          build: {
            number: 1,
            url: '/travis-ci/travis-core/builds/1',
            duration: '30 sec',
            finishedAt: '3 minutes ago'
          }
        }, {
          slug: 'travis-ci/travis-assets',
          build: {
            number: 3,
            url: '/travis-ci/travis-assets/builds/3',
            duration: '30 sec',
            finishedAt: 'a day ago'
          }
        }
      ]);
      displaysRepository({
        href: 'http://github.com/travis-ci/travis-core'
      });
      displaysTabs({
        current: {
          href: '/travis-ci/travis-core'
        },
        builds: {
          href: '/travis-ci/travis-core/builds',
          active: true
        },
        build: {
          hidden: true
        },
        job: {
          hidden: true
        }
      });
      return listsBuilds([
        {
          id: 1,
          slug: 'travis-ci/travis-core',
          number: '1',
          sha: '1234567',
          branch: 'master',
          message: 'commit message 1',
          duration: '30 sec',
          finishedAt: '3 minutes ago',
          color: 'green'
        }, {
          id: 2,
          slug: 'travis-ci/travis-core',
          number: '2',
          sha: '2345678',
          branch: 'feature',
          message: 'commit message 2',
          duration: '-',
          finishedAt: '-',
          color: ''
        }
      ]);
    });
  });

}).call(this);
(function() {

  describe('on the "current" state', function() {
    beforeEach(function() {
      app('travis-ci/travis-core');
      return waitFor(buildRendered);
    });
    afterEach(function() {
      return window.history.pushState({}, null, '/spec.html');
    });
    return it('displays the expected stuff', function() {
      listsRepos([
        {
          slug: 'travis-ci/travis-hub',
          build: {
            number: 4,
            url: '/travis-ci/travis-hub/builds/4',
            duration: '1 min',
            finishedAt: '-'
          }
        }, {
          slug: 'travis-ci/travis-core',
          build: {
            number: 1,
            url: '/travis-ci/travis-core/builds/1',
            duration: '30 sec',
            finishedAt: '3 minutes ago'
          }
        }, {
          slug: 'travis-ci/travis-assets',
          build: {
            number: 3,
            url: '/travis-ci/travis-assets/builds/3',
            duration: '30 sec',
            finishedAt: 'a day ago'
          }
        }
      ]);
      displaysRepository({
        href: 'http://github.com/travis-ci/travis-core'
      });
      displaysSummary({
        type: 'build',
        id: 1,
        repo: 'travis-ci/travis-core',
        commit: '1234567',
        branch: 'master',
        compare: '0123456..1234567',
        finishedAt: '3 minutes ago',
        duration: '30 sec',
        message: 'commit message 1'
      });
      displaysTabs({
        current: {
          href: '/travis-ci/travis-core',
          active: true
        },
        builds: {
          href: '/travis-ci/travis-core/builds'
        },
        build: {
          hidden: true
        },
        job: {
          hidden: true
        }
      });
      listsJobs({
        table: '#jobs',
        headers: ['Job', 'Duration', 'Finished', 'Rvm'],
        jobs: [
          {
            id: 1,
            color: 'green',
            number: '1.1',
            repo: 'travis-ci/travis-core',
            finishedAt: '3 minutes ago',
            duration: '30 sec',
            rvm: 'rbx'
          }, {
            id: 2,
            color: 'red',
            number: '1.2',
            repo: 'travis-ci/travis-core',
            finishedAt: '2 minutes ago',
            duration: '40 sec',
            rvm: '1.9.3'
          }
        ]
      });
      return listsJobs({
        table: '#allowed_failure_jobs',
        headers: ['Job', 'Duration', 'Finished', 'Rvm'],
        jobs: [
          {
            id: 3,
            color: '',
            number: '1.3',
            repo: 'travis-ci/travis-core',
            finishedAt: '-',
            duration: '-',
            rvm: 'jruby'
          }
        ]
      });
    });
  });

}).call(this);
(function() {

  describe('events', function() {
    afterEach(function() {
      return window.history.pushState({}, null, '/spec.html');
    });
    describe('an event adding a repository', function() {
      beforeEach(function() {
        app('travis-ci/travis-core');
        return waitFor(jobsRendered);
      });
      return it('adds a repository to the list', function() {
        waitFor(reposRendered);
        return runs(function() {
          var payload;
          payload = {
            repository: {
              id: 10,
              slug: 'travis-ci/travis-support',
              last_build_id: 10,
              last_build_number: 10,
              last_build_started_at: '2012-07-02T00:01:00Z',
              last_build_finished_at: '2012-07-02T00:02:30Z'
            },
            build: {
              id: 10,
              repository_id: 10
            }
          };
          $.mockjax({
            url: '/builds/10',
            responseTime: 0,
            responseText: payload
          });
          Em.run(function() {
            return Travis.app.receive('build:started', {
              build: {
                id: 10
              }
            });
          });
          waits(100);
          return runs(function() {
            return listsRepo({
              row: 2,
              item: {
                slug: 'travis-ci/travis-support',
                build: {
                  number: 4,
                  url: '/travis-ci/travis-support/builds/10',
                  duration: '1 min 30 sec',
                  finishedAt: 'less than a minute ago'
                }
              }
            });
          });
        });
      });
    });
    describe('an event adding a build', function() {
      beforeEach(function() {
        app('travis-ci/travis-core/builds');
        return waitFor(buildsRendered);
      });
      return it('adds a build to the builds list', function() {
        var payload;
        payload = {
          build: {
            id: 11,
            repository_id: 1,
            commit_id: 11,
            number: '3',
            duration: 55,
            started_at: '2012-07-02T00:02:00Z',
            finished_at: '2012-07-02T00:02:55Z',
            event_type: 'push',
            result: 1
          },
          commit: {
            id: 11,
            sha: '1234567',
            branch: 'master',
            message: 'commit message 3'
          }
        };
        $.mockjax({
          url: '/builds/11',
          responseTime: 0,
          responseText: payload
        });
        Em.run(function() {
          return Travis.app.receive('build:started', {
            build: {
              id: 11
            }
          });
        });
        waits(100);
        return runs(function() {
          return listsBuild({
            row: 3,
            item: {
              id: 11,
              slug: 'travis-ci/travis-core',
              number: '3',
              sha: '1234567',
              branch: 'master',
              message: 'commit message 3',
              finishedAt: 'less than a minute ago',
              duration: '55 sec',
              color: 'red'
            }
          });
        });
      });
    });
    describe('an event adding a job', function() {
      beforeEach(function() {
        app('travis-ci/travis-core');
        waitFor(jobsRendered);
        return runs(function() {
          return waitFor(queuesRendered);
        });
      });
      it('adds a job to the jobs matrix', function() {
        var payload;
        payload = {
          job: {
            id: 15,
            repository_id: 1,
            build_id: 1,
            commit_id: 1,
            log_id: 1,
            number: '1.4',
            duration: 55,
            started_at: '2012-07-02T00:02:00Z',
            finished_at: '2012-07-02T00:02:55Z',
            config: {
              rvm: 'jruby'
            }
          }
        };
        $.mockjax({
          url: '/jobs/15',
          responseTime: 0,
          responseText: payload
        });
        Em.run(function() {
          return Travis.app.receive('job:started', {
            job: {
              id: 15,
              build_id: 1
            }
          });
        });
        waits(100);
        return runs(function() {
          return listsJob({
            table: $('#jobs'),
            row: 3,
            item: {
              id: 15,
              number: '1.4',
              repo: 'travis-ci/travis-core',
              finishedAt: 'less than a minute ago',
              duration: '55 sec',
              rvm: 'jruby'
            }
          });
        });
      });
      it('adds a job to the jobs queue', function() {
        var payload;
        payload = {
          job: {
            id: 12,
            repository_id: 1,
            number: '1.4',
            queue: 'common'
          }
        };
        $.mockjax({
          url: '/jobs/12',
          responseTime: 0,
          responseText: payload
        });
        Em.run(function() {
          return Travis.app.receive('job:started', {
            job: {
              id: 12
            }
          });
        });
        waits(100);
        return runs(function() {
          return listsQueuedJob({
            name: 'common',
            row: 3,
            item: {
              number: '1.4',
              repo: 'travis-ci/travis-core'
            }
          });
        });
      });
      return it('updates only keys that are available', function() {
        Em.run(function() {
          return Travis.app.receive('job:started', {
            job: {
              id: 1,
              build_id: 1
            }
          });
        });
        waits(100);
        return runs(function() {
          return listsJob({
            table: $('#jobs'),
            row: 1,
            item: {
              id: 1,
              number: '1.1',
              repo: 'travis-ci/travis-core',
              finishedAt: '3 minutes ago',
              duration: '30 sec',
              rvm: 'rbx'
            }
          });
        });
      });
    });
    return describe('an event adding a worker', function() {
      beforeEach(function() {
        app('');
        return waitFor(workersRendered);
      });
      return it('adds a worker to the workers list', function() {
        var payload;
        payload = {
          worker: {
            id: 10,
            host: 'worker.travis-ci.org',
            name: 'ruby-3',
            state: 'ready'
          }
        };
        $.mockjax({
          url: '/workers/10',
          responseTime: 0,
          responseText: payload
        });
        Em.run(function() {
          return Travis.app.receive('worker:created', {
            worker: {
              id: 10,
              name: 'ruby-3',
              host: 'worker.travis-ci.org',
              state: 'ready'
            }
          });
        });
        waits(100);
        return runs(function() {
          return listsWorker({
            group: 'worker.travis-ci.org',
            row: 3,
            item: {
              name: 'ruby-3',
              state: 'ready'
            }
          });
        });
      });
    });
  });

}).call(this);
(function() {

  describe('on the "index" state', function() {
    beforeEach(function() {
      app('travis-ci/travis-core');
      return waitFor(buildRendered);
    });
    afterEach(function() {
      return window.history.pushState({}, null, '/spec.html');
    });
    return it('displays the expected stuff', function() {
      listsRepos([
        {
          slug: 'travis-ci/travis-hub',
          build: {
            number: 4,
            url: '/travis-ci/travis-hub/builds/4',
            duration: '1 min',
            finishedAt: '-'
          }
        }, {
          slug: 'travis-ci/travis-core',
          build: {
            number: 1,
            url: '/travis-ci/travis-core/builds/1',
            duration: '30 sec',
            finishedAt: '3 minutes ago'
          }
        }, {
          slug: 'travis-ci/travis-assets',
          build: {
            number: 3,
            url: '/travis-ci/travis-assets/builds/3',
            duration: '30 sec',
            finishedAt: 'a day ago'
          }
        }
      ]);
      displaysRepository({
        href: 'http://github.com/travis-ci/travis-core'
      });
      displaysSummary({
        type: 'build',
        id: 1,
        repo: 'travis-ci/travis-core',
        commit: '1234567',
        branch: 'master',
        compare: '0123456..1234567',
        finishedAt: '3 minutes ago',
        duration: '30 sec',
        message: 'commit message 1'
      });
      displaysTabs({
        current: {
          href: '/travis-ci/travis-core',
          active: true
        },
        builds: {
          href: '/travis-ci/travis-core/builds'
        },
        build: {
          hidden: true
        },
        job: {
          hidden: true
        }
      });
      listsJobs({
        table: '#jobs',
        headers: ['Job', 'Duration', 'Finished', 'Rvm'],
        jobs: [
          {
            color: 'green',
            id: 1,
            number: '1.1',
            repo: 'travis-ci/travis-core',
            finishedAt: '3 minutes ago',
            duration: '30 sec',
            rvm: 'rbx'
          }, {
            color: 'red',
            id: 2,
            number: '1.2',
            repo: 'travis-ci/travis-core',
            finishedAt: '2 minutes ago',
            duration: '40 sec',
            rvm: '1.9.3'
          }
        ]
      });
      return listsJobs({
        table: '#allowed_failure_jobs',
        headers: ['Job', 'Duration', 'Finished', 'Rvm'],
        jobs: [
          {
            color: '',
            id: 3,
            number: '1.3',
            repo: 'travis-ci/travis-core',
            finishedAt: '-',
            duration: '-',
            rvm: 'jruby'
          }
        ]
      });
    });
  });

}).call(this);
(function() {

  describe('on the "job" state', function() {
    beforeEach(function() {
      app('travis-ci/travis-core/jobs/1');
      waitFor(jobRendered);
      return runs(function() {
        return waitFor(hasText('#tab_build', 'Build #1'));
      });
    });
    afterEach(function() {
      return window.history.pushState({}, null, '/spec.html');
    });
    return it('displays the expected stuff', function() {
      listsRepos([
        {
          slug: 'travis-ci/travis-hub',
          build: {
            number: 4,
            url: '/travis-ci/travis-hub/builds/4',
            duration: '1 min',
            finishedAt: '-'
          }
        }, {
          slug: 'travis-ci/travis-core',
          build: {
            number: 1,
            url: '/travis-ci/travis-core/builds/1',
            duration: '30 sec',
            finishedAt: '3 minutes ago'
          }
        }, {
          slug: 'travis-ci/travis-assets',
          build: {
            number: 3,
            url: '/travis-ci/travis-assets/builds/3',
            duration: '30 sec',
            finishedAt: 'a day ago'
          }
        }
      ]);
      displaysRepository({
        href: 'http://github.com/travis-ci/travis-core'
      });
      displaysSummary({
        id: 1,
        type: 'job',
        repo: 'travis-ci/travis-core',
        commit: '1234567',
        branch: 'master',
        compare: '0123456..1234567',
        finishedAt: '3 minutes ago',
        duration: '30 sec',
        message: 'commit message 1'
      });
      displaysTabs({
        current: {
          href: '/travis-ci/travis-core'
        },
        builds: {
          href: '/travis-ci/travis-core/builds'
        },
        build: {
          href: '/travis-ci/travis-core/builds/1'
        },
        job: {
          href: '/travis-ci/travis-core/jobs/1',
          active: true
        }
      });
      return displaysLog(['log 1']);
    });
  });

}).call(this);
(function() {

  describe('the sidebar', function() {
    beforeEach(function() {
      app('travis-ci/travis-core/jobs/1');
      waitFor(jobRendered);
      return runs(function() {
        return waitFor(hasText('#tab_build', 'Build #1'));
      });
    });
    afterEach(function() {
      return window.history.pushState({}, null, '/spec.html');
    });
    return it('displays the expected stuff', function() {
      return listsQueues([
        {
          name: 'common',
          item: {
            number: '5.1',
            repo: 'travis-ci/travis-core'
          }
        }, {
          name: 'common',
          item: {
            number: '5.2',
            repo: 'travis-ci/travis-core'
          }
        }
      ]);
    });
  });

}).call(this);
(function() {
  var _Date;

  minispade.require('app');

  this.reset = function() {
    Em.run(function() {
      var views;
      if (Travis.app) {
        if (Travis.app.store) {
          Travis.app.store.destroy();
        }
        if (views = Travis.app.get('_connectedOutletViews')) {
          views.forEach(function(v) {
            return v.destroy();
          });
        }
        return Travis.app.destroy();
      }
    });
    waits(500);
    $('#content').remove();
    return $('body').append('<div id="content"></div>');
  };

  this.app = function(url) {
    reset();
    return Em.run(function() {
      Travis.run({
        rootElement: $('#content')
      });
      return Em.routes.set('location', url);
    });
  };

  _Date = Date;

  this.Date = function(date) {
    return new _Date(date || '2012-07-02T00:03:00Z');
  };

  this.Date.UTC = _Date.UTC;

}).call(this);
(function() {

  this.notEmpty = function(selector) {
    return function() {
      return $(selector).text().trim() !== '';
    };
  };

  this.hasText = function(selector, text) {
    return function() {
      return $(selector).text().trim() === text;
    };
  };

  this.reposRendered = notEmpty('#repositories li a.current');

  this.buildRendered = notEmpty('#summary .number');

  this.buildsRendered = notEmpty('#builds .number');

  this.jobRendered = notEmpty('#summary .number');

  this.jobsRendered = notEmpty('#jobs .number');

  this.queuesRendered = notEmpty('#queue_common li');

  this.workersRendered = notEmpty('.worker');

}).call(this);
(function() {

  this.after = function(time, func) {
    waits(time);
    return jasmine.getEnv().currentSpec.runs(func);
  };

  this.once = function(condition, func) {
    waitsFor(condition);
    return jasmine.getEnv().currentSpec.runs(func);
  };

  this.waitFor = waitsFor;

}).call(this);
