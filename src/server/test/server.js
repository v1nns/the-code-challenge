var request = require("request"),
  assert = require("assert"),
  app = require("../app.js"),
  base_url = "http://localhost:8080/";

describe("Rest API Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        //expect(response.statusCode).toBe(200);
        assert.equal(200, response.statusCode);
        done();
      });
    });

    it('returns "App is working"', function(done) {
      request.get(base_url, function(error, response, body) {
        //expect(body).toBe("App is working");
        assert.equal("App is working", body);
        done();
      });
    });
  });
});
