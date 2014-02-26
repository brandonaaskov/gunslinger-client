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

      function UserModel(firebaseUser) {
        var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        this.guid = firebaseUser != null ? firebaseUser.id : void 0;
        this.email = (_ref = firebaseUser.basic) != null ? _ref.email : void 0;
        this.name = (_ref1 = firebaseUser.basic) != null ? _ref1.name : void 0;
        this.imageUrl = (_ref2 = firebaseUser.basic) != null ? _ref2.imageUrl : void 0;
        this.location = (_ref3 = firebaseUser.basic) != null ? _ref3.location : void 0;
        this.gender = (_ref4 = firebaseUser.basic) != null ? _ref4.gender : void 0;
        this.profileUrl = (_ref5 = firebaseUser.basic) != null ? _ref5.profileUrl : void 0;
      }

      return UserModel;

    })(BaseModel);
  });

}).call(this);
