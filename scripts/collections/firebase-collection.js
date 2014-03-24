(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('gunslinger').factory('FirebaseCollection', function(BaseCollection, BaseModel, $firebase, config, $q) {
    var FirebaseCollection;
    return FirebaseCollection = (function(_super) {
      __extends(FirebaseCollection, _super);

      FirebaseCollection.prototype.model = BaseModel;

      FirebaseCollection.prototype.url = config.firebase["default"];

      function FirebaseCollection(models, url) {
        if (models == null) {
          models = [];
        }
        if (url) {
          this.url = url;
        }
        FirebaseCollection.__super__.constructor.call(this, models);
      }

      FirebaseCollection.prototype.parse = function(firebaseCollection) {
        return _(firebaseCollection).map(function(value, key) {
          value.id = key;
          return value;
        });
      };

      FirebaseCollection.prototype.fetch = function() {
        var deferred, reference;
        this.currentlyFetching = true;
        deferred = $q.defer();
        reference = $firebase(new Firebase(this.url));
        reference.$on('loaded', (function(_this) {
          return function(firebaseCollection) {
            var collection;
            collection = _this.parse(firebaseCollection);
            _this.add(collection);
            return deferred.resolve(_this.models);
          };
        })(this));
        reference.$on('change', (function(_this) {
          return function(keyChanged) {
            return console.log('keyChanged', keyChanged);
          };
        })(this));
        return deferred.promise;
        this.currentlyFetching = false;
        return reference;
      };

      return FirebaseCollection;

    })(BaseCollection);
  });

}).call(this);
