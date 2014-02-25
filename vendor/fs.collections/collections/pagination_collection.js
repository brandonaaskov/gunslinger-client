(function() {
  var app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = angular.module('fs.collections');

  app.factory('PaginationCollection', function(BaseCollection, BaseModel) {
    var PaginationCollection;
    return PaginationCollection = (function(_super) {
      __extends(PaginationCollection, _super);

      function PaginationCollection(models, options) {
        var defaults;
        defaults = {
          exhausted: false,
          limit: 10,
          token: null
        };
        options = _.extend({}, options);
        options.pagination = _.extend(defaults, options.pagination);
        PaginationCollection.__super__.constructor.call(this, models, options);
      }

      PaginationCollection.prototype.parse = function(res) {
        var items;
        items = res.data;
        if (items.length) {
          this.pagination.token = _(items).last().pagination_token;
        } else {
          this.pagination.exhausted = true;
        }
        return PaginationCollection.__super__.parse.call(this, res);
      };

      PaginationCollection.prototype.reset = function() {
        PaginationCollection.__super__.reset.apply(this, arguments);
        this.pagination.exhausted = false;
        this.pagination.token = null;
        return this;
      };

      PaginationCollection.prototype.canFetch = function() {
        return this.pagination.exhausted === false && this.currentlyFetching === false;
      };

      PaginationCollection.prototype.nextPage = function(options) {
        var defaults;
        options = _.extend({}, options);
        defaults = {};
        if (this.pagination.token) {
          defaults.page_token = this.pagination.token;
        } else {
          defaults.offset = this.length;
          defaults.limit = this.pagination.limit;
        }
        options.params = _.extend(defaults, options.params);
        return this.fetch(options);
      };

      return PaginationCollection;

    })(BaseCollection);
  });

}).call(this);
