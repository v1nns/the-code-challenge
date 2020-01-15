var request = require("request"),
  assert = require("assert"),
  app = require("../app.js"),
  base_url = "http://localhost:8080/api/v1/compiler";

describe("Compiler API", function() {
  describe("POST /cpp (Hello, World!)", function() {
    var helloWorld =
      '#include <iostream>\n \
    using namespace std;\n \
    int main()\n \
    {\n \
        cout << "Hello, World!";\n \
        return 0;\n \
    }';

    it("returns status code 200", function(done) {
      request.post(
        `${base_url}/cpp`,
        {
          headers: {
            "content-type": "text/plain"
          },
          body: helloWorld
        },
        function(error, response, body) {
          //expect(response.statusCode).toBe(200);
          assert.equal(200, response.statusCode);
          done();
        }
      );
    });

    it('returns "Hello, World!"', function(done) {
      request.post(
        `${base_url}/cpp`,
        {
          headers: {
            "content-type": "text/plain"
          },
          body: helloWorld
        },
        function(error, response, body) {
          var json = JSON.parse(body);

          //expect(body.data.stdout).toBe("Hello, World!");
          assert.equal("Hello, World!", json.data.stdout);
          done();
        }
      );
    });
  });
});
