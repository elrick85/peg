var parser = require("../build/parser");
var utils = require("../helpers/utils");
var config = require("../source/config");

var parse = function(expression){
	var result;

	try{
		result = parser.parse(expression);
	} catch (e) {
		var message = e.message + "(line: "+e.line+", column: "+e.column+")";
		e.message = message
		throw e;
	}

	return result;
};

describe("Parser tests", function(){
	/*it("0x3E1==993", function(){
		var result = parse("0x3E1==993");
		expect(result).to.equal(1);
	});
	
	it("rand(55) + 1 > 0", function(){
		var result = parse("rand(55) + 1 > 0");
		expect(result).to.equal(1);
	});
	
	it("1-4 == -3", function(){
		var result = parse("1-4 == -3");
		expect(result).to.equal(1);
	});
	
	it("'asdf'.length == 4", function(){
		var result = parse("'asdf'.length == 4");
		expect(result).to.equal(1);
	});

	it("'asdf'.length > 4", function(){
		var result = parse("'asdf'.length > 4");
		expect(result).to.equal(0);
	});

	it("'12345af'.hex == 0x12345af", function(){
		var result = parse("'12345af'.hex == 0x12345af");
		expect(result).to.equal(1);
	});

	it("'text with ''special characters'''[1:4] == 'ext'", function(){
		var result = parse("'text with ''special characters'''[1:4] == 'ext'");
		expect(result).to.equal(1);
	});

	it("'text with ''special characters'''[1:1] == ''", function(){
		var result = parse("'text with ''special characters'''[1:1] == ''");
		expect(result).to.equal(1);
	});

	it("'asqw'[:2] . 'df' == 'asdf'", function(){
		var result = parse("'asqw'[:2] . 'df' == 'asdf'");
		expect(result).to.equal(1);
	});

	it("'asdf' == 'asqw'[2:] . 'df'", function(){
		var result = parse("'asdf' == 'asqw'[2:] . 'df'");
		expect(result).to.equal(0);
	});

	it("3 * 2 - 1 == 5", function(){
		var result = parse("3 * 2 - 1 == 5");
		expect(result).to.equal(1);
	});

	it("47 << 24 + 253 << 16 + 0 << 8 + 46 == 0x2FFD002E", function(){
		var result = parse("47 << 24 + 253 << 16 + 0 << 8 + 46 == 0x2FFD002E");
		expect(result).to.equal(1);
	});

	it("10 & 6 == 2", function(){
		var result = parse("10 & 6 == 2");
		expect(result).to.equal(1);
	});

	it("10 | 6 == 14", function(){
		var result = parse("10 | 6 == 14");
		expect(result).to.equal(1);
	});

	it("10 ^ 6 == 12", function(){
		var result = parse("10 ^ 6 == 12");
		expect(result).to.equal(1);
	});

	it("5 % 2 == 1", function(){
		var result = parse("5 % 2 == 1");
		expect(result).to.equal(1);
	});

	it("6 / 2 == 3", function(){
		var result = parse("6 / 2 == 3");
		expect(result).to.equal(1);
	});

	it("5 + 2 == 7", function(){
		var result = parse("5 + 2 == 7");
		expect(result).to.equal(1);
	});

	it("'av' . 'er' == 'aver'", function(){
		var result = parse("'av' . 'er' == 'aver'");
		expect(result).to.equal(1);
	});

	it("'av' . 'er'.length == 4", function(){
		var result = parse("'av' . 'er'.length == 4");
		expect(result).to.equal(1);
	});

	it("1 == 1", function(){
		var result = parse("1 == 1");
		expect(result).to.equal(1);
	});

	it("1 != 1", function(){
		var result = parse("1 != 1");
		expect(result).to.equal(0);
	});

	it("-44 >= 0 or not 0 <= 0", function(){
		var result = parse("-44 >= 0 or not 0 <= 0");
		expect(result).to.equal(0);
	});

	it("-44 < 0 and 22 > 0", function(){
		var result = parse("-44 < 0 and 22 > 0");
		expect(result).to.equal(1);
	});

	it("-44 < 0 && 22 > 0", function(){
		var result = parse("-44 < 0 && 22 > 0");
		expect(result).to.equal(1);
	});

	it("-44 >= 0 || -5 <= -8", function(){
		var result = parse("-44 >= 0 || -5 <= -8");
		expect(result).to.equal(0);
	});

	it("ip >> 16 & 0xff >= 15", function(){
		var result = parse("ip >> 16 & 0xff >= 15");
		expect(result).to.equal(1);
	});

	it("zip == 1123 or zip > 100 and zip < 200", function(){
		var result = parse("zip == 1123 or zip > 100 and zip < 200");
		expect(result).to.equal(0);
	});

	it("node > 0", function(){
		var result = parse("node > 0");
		expect(result).to.equal(1);
	});

	it("tasks >= 0", function(){
		var result = parse("tasks >= 0");
		expect(result).to.equal(1);
	});
*/
	it("2 - 3 - 5 == -6", function(){
		var result = parse("2 - 3 - 5 == -6");
		expect(result).to.equal(1);
	});

	it("2 - 5 + 1 == -2", function(){
		var result = parse("2 - 5 + 1 == -2");
		expect(result).to.equal(1);
	});
/*
	it("20 / 2 / 2 == 5", function(){
		var result = parse("20 / 2 / 2 == 5");
		expect(result).to.equal(1);
	});

	it("'word'.length + 2 == 6", function(){
		var result = parse("'word'.length + 2 == 6");
		expect(result).to.equal(1);
	});

	it("2 + 'word'.length == 6", function(){
		var result = parse("2 + 'word'.length == 6");
		expect(result).to.equal(1);
	});

	it("-node + 24 + 0x5aF - 'hello'.length == 360", function(){
		var result = parse("-node + 24 + 0x5aF - 'hello'.length == 360");
		expect(result).to.equal(1);
	});

	it("-node + 24/2 + 0x5aF - 'hello'.length + 3 << 2 == 360", function(){
		var result = parse("-node + 24/2 + 0x5aF - 'hello'.length + 3 << 2 == 360");
		expect(result).to.equal(1);
	});*/
});