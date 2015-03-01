var parser = require("../build/parser");
var utils = require("../helpers/utils");
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
	it("0x3E1==993", function(){
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

	/*

expect(parse("'av' . 'er' == 'aver'")).toBe(1);

expect(parse("'av' . 'er'.length == 4")).toBe(1);

expect(parse("1 == 1")).toBe(1);

expect(parse("1 != 1")).toBe(0);

expect(parse("-44 >= 0 or not 0 <= 0")).toBe(0);

expect(parse("-44 < 0 and 22 > 0")).toBe(1);

expect(parse("-44 < 0 && 22 > 0")).toBe(1);

expect(parse("-44 >= 0 || -5 <= -8")).toBe(0);

expect(parse("ip >> 16 & 0xff >= 15")).toBe(1);

expect(parse("zip == 1123 or zip > 100 and zip < 200")).toBe(0);

expect(parse("node > 0")).toBe(1);

expect(parse("tasks >= 0")).toBe(1);

expect(parse("2 - 3 - 5 == -6")).toBe(1);

expect(parse("2 - 5 + 1 == -2")).toBe(1);

expect(parse("20 / 2 / 2 == 5")).toBe(1);

expect(parse("'word'.length + 2 == 6")).toBe(1);

expect(parse("2 + 'word'.length == 6")).toBe(1);

expect(parse("-node + 24 + 0x5aF - 'hello'.length == 360")).toBe(1);

expect(parse("-node + 24/2 + 0x5aF - 'hello'.length + 3 << 2 == 360")).toBe(1);
	*/
});

describe("String tests", function(){
	it("'test text' == 'test text'", function(){
		var result = parse("'test text' == 'test text'");
		expect(result).to.equal(1);
	});
	it("'text ''special''' == 'text ''special'''", function(){
		var result = parse("'text ''special''' == 'text ''special'''");
		expect(result).to.equal(1);
	});
});

describe("Shift tests", function(){
	it("48<<2 == 192", function(){
		var result = parse("48 << 2 == 192");
		expect(result).to.equal(1);
	});
	it("48 << 2 + 48 >> 2 == 204", function(){
		var result = parse("48 << 2 + 48 >> 2 == 204");
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