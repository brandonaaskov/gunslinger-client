(function() {
  describe("The dependable BaseCollection", function() {
    var Collection, FakeModel, Model, backend;
    Collection = void 0;
    Model = void 0;
    backend = void 0;
    FakeModel = (function() {
      function FakeModel(attrs) {
        if (attrs.id) {
          this.id = attrs.id;
        }
        this.spy = jasmine.createSpy();
        this.save = jasmine.createSpy();
        this.spy(attrs);
      }

      return FakeModel;

    })();
    beforeEach(function() {
      module('fs.collections');
      return inject(function(BaseCollection, BaseModel, $httpBackend) {
        Collection = BaseCollection;
        Model = BaseModel;
        return backend = $httpBackend;
      });
    });
    it("should create models using the objects you pass it", function() {
      var instance;
      instance = new Collection([
        {
          id: 1
        }, {
          id: 2
        }, {
          id: 3
        }
      ]);
      expect(instance.length).toBe(3);
      expect(instance.models[0] instanceof Model).toBe(true);
      expect(instance.models[0].id).toBe(1);
      expect(instance.models[1] instanceof Model).toBe(true);
      expect(instance.models[1].id).toBe(2);
      expect(instance.models[2] instanceof Model).toBe(true);
      expect(instance.models[2].id).toBe(3);
      return expect(instance.models[3]).toBeUndefined();
    });
    it("should store options passed to it on the collection", function() {
      var instance;
      instance = new Collection([], {
        url: 'http://google.com'
      });
      expect(instance.length).toBe(0);
      return expect(instance.url).toBe('http://google.com');
    });
    it("should initialize new models using its 'model' attribute", function() {
      var instance;
      instance = new Collection([
        {
          id: 1
        }
      ], {
        model: FakeModel
      });
      expect(instance.length).toBe(1);
      expect(instance.models[0] instanceof FakeModel).toBe(true);
      return expect(instance.models[0].spy).toHaveBeenCalledWith({
        id: 1
      });
    });
    it("should be able to handle being passed both objects and models", function() {
      var instance;
      instance = new Collection([
        {
          id: 1
        }, {
          id: 2
        }
      ], {
        model: FakeModel
      });
      expect(instance.length).toBe(2);
      expect(instance.models[0] instanceof FakeModel).toBe(true);
      expect(instance.models[0].spy.callCount).toBe(1);
      expect(instance.models[1] instanceof FakeModel).toBe(true);
      return expect(instance.models[1].spy.callCount).toBe(1);
    });
    it("should store a reference to iself on its models", function() {
      var instance;
      instance = new Collection([
        {
          id: 1
        }, new Model({
          id: 2
        })
      ]);
      expect(instance.models[0].collection).toBe(instance);
      return expect(instance.models[1].collection).toBe(instance);
    });
    it("should empty its model store when reset", function() {
      var instance;
      instance = new Collection([
        {
          id: 1
        }, new Model({
          id: 2
        })
      ]);
      expect(instance.length).toBe(2);
      expect(instance.models.length).toBe(2);
      instance.reset();
      expect(instance.length).toBe(0);
      return expect(instance.models.length).toBe(0);
    });
    it("should let you look up models based on their ID", function() {
      var a, b, c, instance;
      a = new Model({
        id: 1
      });
      b = new Model({
        id: 2
      });
      c = new Model({
        id: 'foo'
      });
      instance = new Collection([a, b, c]);
      expect(instance.get(1)).toBe(a);
      expect(instance.get(2)).toBe(b);
      expect(instance.get('foo')).toBe(c);
      expect(instance.get(3)).toBeUndefined();
      return expect(instance.get('3')).toBeUndefined();
    });
    it("should prevent you from adding a model with the same id twice", function() {
      var a, b, c, instance;
      instance = new Collection();
      a = new Model({
        id: 1,
        bacon: 'canadian'
      });
      b = new Model({
        id: 2,
        bacon: 'smoked'
      });
      c = new Model({
        id: 2,
        bacon: 'crunchy'
      });
      instance.add([a, b, c]);
      expect(instance.length).toBe(2);
      return expect(instance.get(2).get('bacon')).toBe('smoked');
    });
    it("should let you add multiple models at once", function() {
      var a, b, c, instance;
      instance = new Collection();
      a = new Model({
        id: 1,
        bacon: 'canadian'
      });
      b = new Model({
        id: 2,
        bacon: 'smoked'
      });
      c = new Model({
        id: 3,
        bacon: 'crunchy'
      });
      instance.add([a, b, c]);
      expect(instance.length).toBe(3);
      return expect(instance.get(2).get('bacon')).toBe('smoked');
    });
    it("should pluck attributes from its models", function() {
      var a, b, c, instance, typesOfBacon;
      instance = new Collection();
      a = new Model({
        id: 1,
        bacon: 'canadian'
      });
      b = new Model({
        id: 2,
        bacon: 'smoked'
      });
      c = new Model({
        id: 3,
        bacon: 'crunchy'
      });
      instance.add([a, b, c]);
      typesOfBacon = instance.pluck('bacon');
      return expect(typesOfBacon).toEqual(['canadian', 'smoked', 'crunchy']);
    });
    it("should pluck the data key from incoming HTTP responses", function() {
      var a, b, instance, parsed;
      instance = new Collection();
      a = new Model();
      b = new Model();
      parsed = instance.parse({
        headers: 'foo',
        things: 'bar',
        data: [a, b]
      });
      return expect(parsed).toEqual([a, b]);
    });
    it("should allow you to remove models by reference", function() {
      var a, b, c, instance, removed;
      instance = new Collection();
      a = new Model({
        id: 1,
        bacon: 'canadian'
      });
      b = new Model({
        id: 2,
        bacon: 'smoked'
      });
      c = new Model({
        id: 3,
        bacon: 'crunchy'
      });
      instance.add([a, b, c]);
      expect(instance.length).toBe(3);
      removed = instance.remove(b);
      expect(instance.length).toBe(2);
      expect(instance.first().get('bacon')).toBe('canadian');
      expect(instance.last().get('bacon')).toBe('crunchy');
      return expect(removed).toEqual(b);
    });
    it("should allow you to remove multiple models at once", function() {
      var a, b, c, instance, removed;
      instance = new Collection();
      a = new Model({
        id: 1,
        bacon: 'canadian'
      });
      b = new Model({
        id: 2,
        bacon: 'smoked'
      });
      c = new Model({
        id: 3,
        bacon: 'crunchy'
      });
      instance.add([a, b, c]);
      expect(instance.length).toBe(3);
      removed = instance.remove([a, b]);
      expect(instance.length).toBe(1);
      expect(instance.last().get('bacon')).toBe('crunchy');
      return expect(removed).toEqual([a, b]);
    });
    it("should fetch models using its URL property", function() {
      var a, b, instance;
      instance = new Collection([], {
        url: 'http://google.com'
      });
      a = {
        id: 1,
        foo: 'bar'
      };
      b = {
        id: 2,
        foo: 'baz'
      };
      backend.expectGET('http://google.com').respond(200, [a, b]);
      expect(instance.length).toBe(0);
      instance.fetch();
      backend.flush();
      expect(instance.length).toBe(2);
      expect(instance.get(1).get('foo')).toBe('bar');
      return expect(instance.get(2).get('foo')).toBe('baz');
    });
    it("should fetch models using its URL property", function() {
      var a, b, instance;
      instance = new Collection([], {
        url: 'http://google.com'
      });
      a = {
        id: 1,
        foo: 'bar'
      };
      b = {
        id: 2,
        foo: 'baz'
      };
      backend.expectGET('http://google.com').respond(200, [a, b]);
      expect(instance.length).toBe(0);
      instance.fetch();
      backend.flush();
      expect(instance.length).toBe(2);
      expect(instance.get(1).get('foo')).toBe('bar');
      return expect(instance.get(2).get('foo')).toBe('baz');
    });
    it("should be able to fetch URLs using a URL method", function() {
      var instance;
      instance = new Collection();
      instance.url = function() {
        return ['http://', 'google', '.com'].join('');
      };
      backend.expectGET('http://google.com').respond(200, [
        {
          id: 1,
          foo: 'bar'
        }
      ]);
      instance.fetch();
      backend.flush();
      expect(instance.length).toBe(1);
      return expect(instance.get(1).get('foo')).toBe('bar');
    });
    it("should handle gnarly HTTP responses using its parse method", function() {
      var a, b, instance;
      a = {
        id: 1,
        foo: 'bar'
      };
      b = {
        id: 2,
        foo: 'baz'
      };
      instance = new Collection([], {
        url: 'http://google.com',
        parse: function(res) {
          return res.data.deeply.nested.object;
        }
      });
      backend.expectGET('http://google.com').respond(200, {
        deeply: {
          nested: {
            object: [a, b]
          }
        }
      });
      instance.fetch();
      backend.flush();
      expect(instance.length).toBe(2);
      expect(instance.get(1).get('foo')).toBe('bar');
      return expect(instance.get(2).get('foo')).toBe('baz');
    });
    it("should let you know if it's fetching at the moment", function() {
      var instance;
      instance = new Collection([], {
        url: 'http://google.com'
      });
      expect(instance.currentlyFetching).toBe(false);
      backend.expectGET('http://google.com').respond(200, []);
      instance.fetch();
      expect(instance.currentlyFetching).toBe(true);
      backend.flush();
      return expect(instance.currentlyFetching).toBe(false);
    });
    it("should let you use different HTTP methods when fetching", function() {
      var instance, model;
      instance = new Collection([], {
        url: 'http://google.com'
      });
      model = {
        id: 5,
        bacon: 'tasty'
      };
      return ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'].forEach(function(method) {
        backend["expect" + method]('http://google.com').respond(200, [model]);
        instance.fetch({
          method: method
        });
        backend.flush();
        expect(instance.length).toBe(1);
        expect(instance.get(5).get('bacon')).toBe('tasty');
        return instance.reset();
      });
    });
    it("should let you fetch with query string params", function() {
      var instance, model;
      instance = new Collection([], {
        url: 'http://google.com'
      });
      model = {
        id: 5,
        bacon: 'tasty'
      };
      backend.expectGET('http://google.com?baz=qux&foo=bar').respond(200, [model]);
      instance.fetch({
        params: {
          baz: 'qux',
          foo: 'bar'
        }
      });
      backend.flush();
      expect(instance.length).toBe(1);
      return expect(instance.get(5).get('bacon')).toBe('tasty');
    });
    it("should let you fetch with post data", function() {
      var instance, model;
      instance = new Collection([], {
        url: 'http://google.com'
      });
      model = {
        id: 5,
        bacon: 'tasty'
      };
      backend.expectPOST('http://google.com', {
        foo: 'bar',
        baz: 'qux'
      }).respond(200, [model]);
      instance.fetch({
        method: 'POST',
        data: {
          foo: 'bar',
          baz: 'qux'
        }
      });
      backend.flush();
      expect(instance.length).toBe(1);
      return expect(instance.get(5).get('bacon')).toBe('tasty');
    });
    it("should let you fetch with post data and query strings", function() {
      var instance, model;
      instance = new Collection([], {
        url: 'http://google.com'
      });
      model = {
        id: 5,
        bacon: 'tasty'
      };
      backend.expectPOST('http://google.com?foo=bar', {
        baz: 'qux'
      }).respond(200, [model]);
      instance.fetch({
        method: 'POST',
        params: {
          foo: 'bar'
        },
        data: {
          baz: 'qux'
        }
      });
      backend.flush();
      expect(instance.length).toBe(1);
      return expect(instance.get(5).get('bacon')).toBe('tasty');
    });
    it("shouldn't mutate your options object", function() {
      var instance, model, options;
      instance = new Collection([], {
        url: 'http://google.com'
      });
      model = {
        id: 5,
        bacon: 'tasty'
      };
      backend.expectGET('http://google.com').respond(200, [model]);
      options = {};
      instance.fetch(options);
      backend.flush();
      expect(options.method).toBe(void 0);
      expect(options.url).toBe(void 0);
      expect(instance.length).toBe(1);
      return expect(instance.get(5).get('bacon')).toBe('tasty');
    });
    it("should maintain a sort order when adding models", function() {
      var a, b, c, instance;
      instance = new Collection([], {
        url: 'http://google.com'
      });
      a = {
        id: 1,
        foo: 'bar'
      };
      b = {
        id: 2,
        foo: 'baz'
      };
      c = {
        id: 3,
        foo: 'qux'
      };
      instance.add([b, c, a]);
      expect(instance.first().get('foo')).toBe('bar');
      return expect(instance.last().get('foo')).toBe('qux');
    });
    it("should allow you to add models out of order", function() {
      var a, b, c, instance;
      instance = new Collection([], {
        url: 'http://google.com'
      });
      a = {
        id: 1,
        foo: 'bar'
      };
      b = {
        id: 2,
        foo: 'baz'
      };
      c = {
        id: 3,
        foo: 'qux'
      };
      instance.add([b, c, a], {
        sort: false
      });
      expect(instance.first().get('foo')).toBe('baz');
      return expect(instance.last().get('foo')).toBe('bar');
    });
    it("should use the comparator property to determine sort order", function() {
      var a, b, c, instance;
      a = {
        id: 1,
        foo: 'bar'
      };
      b = {
        id: 2,
        foo: 'baz'
      };
      c = {
        id: 3,
        foo: 'qux'
      };
      instance = new Collection([], {
        url: 'http://google.com',
        comparator: function(a, b) {
          return b.id - a.id;
        }
      });
      instance.add([b, c, a]);
      expect(instance.first().get('foo')).toBe('qux');
      return expect(instance.last().get('foo')).toBe('bar');
    });
    it("should be able to create new models and add them to the collection", function() {
      var instance;
      instance = new Collection([], {
        model: FakeModel
      });
      instance.create({
        id: 1
      });
      expect(instance.length).toBe(1);
      return expect(instance.last() instanceof FakeModel).toBe(true);
    });
    it("should save newly created models", function() {
      var instance;
      instance = new Collection([], {
        model: FakeModel
      });
      instance.create({
        id: 1
      });
      return expect(instance.last().save).toHaveBeenCalled();
    });
    it("should not allow you to create duplicates of existing models", function() {
      var instance, model;
      model = new FakeModel({
        id: 1
      });
      instance = new Collection([model], {
        model: FakeModel
      });
      instance.create(model);
      expect(instance.length).toBe(1);
      return expect(model.save).not.toHaveBeenCalled();
    });
    it("should return itself from promises", function() {
      var instance;
      instance = new Collection([], {
        url: 'http://google.com'
      });
      backend.expectGET('http://google.com').respond(200, []);
      instance.fetch().then(function(collection) {
        return expect(collection).toBe(instance);
      });
      return backend.flush();
    });
    return it("should let you retrieve models by index", function() {
      var a, b, c, instance;
      a = {
        id: 1,
        foo: 'bar'
      };
      b = {
        id: 2,
        foo: 'baz'
      };
      c = {
        id: 3,
        foo: 'qux'
      };
      instance = new Collection([a, b, c]);
      expect(instance.eq(0).toJSON()).toEqual(a);
      expect(instance.eq(1).toJSON()).toEqual(b);
      expect(instance.eq(2).toJSON()).toEqual(c);
      return expect(instance.eq(3)).toBeUndefined();
    });
  });

}).call(this);
