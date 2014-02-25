(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('gunslinger').factory('UserModel', function(BaseModel) {
    var UserModel;
    return UserModel = (function(_super) {
      __extends(UserModel, _super);

      UserModel.prototype.guid = void 0;

      UserModel.prototype.email = void 0;

      UserModel.prototype.name = void 0;

      UserModel.prototype.imageUrl = void 0;

      UserModel.prototype.location = void 0;

      UserModel.prototype.gender = void 0;

      UserModel.prototype.profileUrl = void 0;

      UserModel.prototype.github = void 0;

      UserModel.prototype.facebook = void 0;

      UserModel.prototype.twitter = void 0;

      function UserModel(firebaseUser) {
        var merged;
        this.guid = firebaseUser != null ? firebaseUser.id : void 0;
        this.github = firebaseUser != null ? firebaseUser.github : void 0;
        this.facebook = firebaseUser != null ? firebaseUser.facebook : void 0;
        this.twitter = firebaseUser != null ? firebaseUser.twitter : void 0;
        merged = _(this.twitter).defaults(this.facebook).defaults(this.github).value();
        this.merged = merged;
        this.name = merged != null ? merged.displayName : void 0;
        this.imageUrl = merged != null ? merged.avatar_url : void 0;
        this.location = merged != null ? merged.location : void 0;
        this.gender = merged != null ? merged.gender : void 0;
        this.profileUrl = merged != null ? merged.profileUrl : void 0;
      }

      return UserModel;

    })(BaseModel);
  });

}).call(this);
