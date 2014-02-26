(function() {
  var app,
    __slice = [].slice;

  app = angular.module('fs.collections');

  app.factory('BaseModel', function($http) {
    var BaseModel, modelMethods;
    BaseModel = (function() {
      BaseModel.prototype.parse = function(res) {
        return res.data;
      };

      BaseModel.prototype._hasIdAttribute = function(attrs) {
        return _(Object.keys(attrs)).contains(this.idAttribute) != null;
      };

      function BaseModel(attrs, opts) {
        var key, value;
        if (attrs == null) {
          attrs = {};
        }
        if (opts == null) {
          opts = {};
        }
        this.attributes = {};
        for (key in attrs) {
          value = attrs[key];
          this.attributes[key] = value;
        }
        for (key in opts) {
          value = opts[key];
          this[key] = value;
        }
        if (this._hasIdAttribute(attrs)) {
          this.id = attrs[this.idAttribute];
        }
      }

      BaseModel.prototype.has = function(key) {
        return this.attributes[key] != null;
      };

      BaseModel.prototype.get = function(key) {
        return this.attributes[key];
      };

      BaseModel.prototype.set = function(key, val) {
        var aKey, aVal, attrs;
        if (!key) {
          return this;
        }
        if (typeof key === 'object') {
          attrs = key;
        } else {
          attrs = {};
          attrs[key] = val;
        }
        if (this._hasIdAttribute(attrs)) {
          this.id = attrs[this.idAttribute];
        }
        for (aKey in attrs) {
          aVal = attrs[aKey];
          this.attributes[aKey] = aVal;
        }
        return this;
      };

      BaseModel.prototype.urlRoot = '';

      BaseModel.prototype.idAttribute = 'id';

      BaseModel.prototype.isNew = function() {
        if (this.id != null) {
          return false;
        } else {
          return true;
        }
      };

      BaseModel.prototype.url = function(method) {
        var base;
        base = _.result(this, 'urlRoot') || _.result(this.collection, 'url');
        if (this.isNew()) {
          return base;
        } else {
          return base + (base.charAt(base.length - 1) === '/' ? '' : '/' + encodeURIComponent(this.id));
        }
      };

      BaseModel.prototype.toJSON = function() {
        return _.clone(this.attributes);
      };

      BaseModel.prototype.fetch = function(opts) {
        if (opts == null) {
          opts = {};
        }
        _(opts).defaults({
          method: 'GET',
          url: this.url('read')
        });
        return $http(opts).then(_(this.parse).bind(this)).then(_(this.set).bind(this));
      };

      BaseModel.prototype.save = function(opts) {
        if (opts == null) {
          opts = {};
        }
        _(opts).defaults({
          method: this.isNew() ? 'POST' : 'PUT',
          url: this.url(this.isNew() ? 'create' : 'update'),
          data: this.toJSON()
        });
        return $http(opts).then(_(this.parse).bind(this)).then(_(this.set).bind(this));
      };

      BaseModel.prototype.destroy = function(opts) {
        if (opts == null) {
          opts = {};
        }
        if (this.collection) {
          this.collection.remove(this);
        }
        if (!this.isNew()) {
          _(opts).defaults({
            method: 'DELETE',
            url: this.url('delete')
          });
          return $http(opts).then(_(this.parse).bind(this));
        }
      };

      return BaseModel;

    })();
    modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];
    _.each(modelMethods, function(method) {
      return BaseModel.prototype[method] = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        args.unshift(this.attributes);
        return _[method].apply(_, args);
      };
    });
    return BaseModel;
  });

}).call(this);