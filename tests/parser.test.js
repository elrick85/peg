var parser = require("../build/parser");

describe("Parser tests", function(){
	it("simple test", function(){
		var result = parser.parse("2*(3+4)");
		assert.equal(result, 14);
	});
});