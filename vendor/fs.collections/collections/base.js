(function() {
  var app,
    __slice = [].slice;

  app = angular.module('fs.collections');

  app.factory('BaseCollection', function($http, BaseModel) {
    var BaseCollection, attributeMethods, methods;
    BaseCollection = (function() {
      BaseCollection.prototype.currentlyFetching = false;

      function BaseCollection(models, opts) {
        var key, value;
        for (key in opts) {
          value = opts[key];
          this[key] = value;
        }
        this.models = [];
        this.length = 0;
        this.add(models);
      }

      BaseCollection.prototype.url = function() {};

      BaseCollection.prototype.model = BaseModel;

      BaseCollection.prototype.parse = function(res) {
        return res.data;
      };

      BaseCollection.prototype.fetch = function(options) {
        var defaults;
        defaults = {
          method: 'GET',
          url: _(this).result('url')
        };
        options = _.extend(defaults, options);
        if (options.params) {
          options.params = _.extend({}, options.params);
        }
        if (options.data) {
          options.data = _.extend({}, options.data);
        }
        this.currentlyFetching = true;
        return $http(options).then(_.bind(this.parse, this)).then((function(_this) {
          return function(models) {
            _this.add(models);
            _this.currentlyFetching = false;
            return _this;
          };
        })(this));
      };

      BaseCollection.prototype.eq = function(index) {
        var _ref;
        return (_ref = this.models) != null ? _ref[index] : void 0;
      };

      BaseCollection.prototype.get = function(id) {
        return _(this.models).findWhere({
          id: id
        });
      };

      BaseCollection.prototype.remove = function(models) {
        var isSingular;
        isSingular = !_(models).isArray();
        if (isSingular) {
          models = [models];
        }
        _(models).forEach((function(_this) {
          return function(model) {
            var index;
            index = _this.indexOf(model);
            _this.models.splice(index, 1);
            return _this.length--;
          };
        })(this));
        if (isSingular) {
          return models[0];
        } else {
          return models;
        }
      };

      BaseCollection.prototype.add = function(models, options) {
        var added, isSingular;
        if (!models) {
          return;
        }
        options = _.extend({
          sort: true
        }, options);
        isSingular = !_(models).isArray();
        models = isSingular ? [models] : models.slice();
        added = [];
        models.forEach((function(_this) {
          return function(model) {
            model = _this._prepareModel(model);
            added.push(model);
            _this.length++;
            return _this.models.push(model);
          };
        })(this));
        if (options.sort) {
          this.sort();
        }
        if (isSingular) {
          return added[0];
        } else {
          return added;
        }
      };

      BaseCollection.prototype.create = function(attrs) {
        var instance;
        instance = this.add(attrs);
        if (instance) {
          return instance.save();
        }
      };

      BaseCollection.prototype.reset = function() {
        this.models = [];
        this.length = 0;
        return this;
      };

      BaseCollection.prototype.sort = function() {
        if (this.comparator) {
          return this.models.sort(this.comparator);
        } else {
          return this.models.sort(function(a, b) {
            return a.id - b.id;
          });
        }
      };

      BaseCollection.prototype._prepareModel = function(attrs) {
        var model;
        if (attrs instanceof this.model) {
          model = attrs;
          model.collection = this;
        } else {
          model = new this.model(attrs, {
            collection: this
          });
        }
        return model;
      };

      BaseCollection.prototype.pluck = function(attr) {
        return _.invoke(this.models, 'get', attr);
      };

      return BaseCollection;

    })();
    methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl', 'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke', 'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest', 'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle', 'lastIndexOf', 'isEmpty', 'chain'];
    _.each(methods, function(method) {
      return BaseCollection.prototype[method] = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        args.unshift(this.models);
        return _[method].apply(_, args);
      };
    });
    attributeMethods = ['groupBy', 'countBy', 'sortBy'];
    _.each(attributeMethods, function(method) {
      return BaseCollection.prototype[method] = function(value, context) {
        var iterator;
        iterator = _.isFunction(value) ? value : function(model) {
          return model.get(value);
        };
        return _[method](this.models, iterator, context);
      };
    });
    return BaseCollection;
  });

}).call(this);
