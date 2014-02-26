(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('gunslinger').factory('UsersCollection', function(FirebaseCollection, UserModel, config) {
    var UsersCollection;
    return UsersCollection = (function(_super) {
      __extends(UsersCollection, _super);

      UsersCollection.prototype.model = UserModel;

      UsersCollection.prototype.url = config.firebase.users;

      function UsersCollection(models, url) {
        UsersCollection.__super__.constructor.call(this, models, url);
        this.fetch();
      }

      return UsersCollection;

    })(FirebaseCollection);
  });

}).call(this);
