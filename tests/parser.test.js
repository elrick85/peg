var parser = require("../build/parser");
var utils = require("../helpers/utils");

describe("Parser tests", function(){
	it("simple test", function(){
		var result = parser.parse("2*(3+4)");
		assert.equal(result, 14);
	});
	
	it("hex test", function(){
		var result = parser.parse("0x3E1==993")
		expect(result).to.equal(1);
	});
});

describe("Hex tests", function(){
	it("from hexdecimal to decimal", function(){
		var hexdecimal = "0x3E1";
		var decimal = utils.decimalFromHex(hexdecimal);
		
		expect(decimal).to.equal(993);
	});
	
	it("from decimal to hexdecimal", function(){
		var decimal = 993;
		var hexdecimal = utils.hexFromDecimal(decimal);
		
		expect(hexdecimal).to.equal("0x3E1");
	});
});