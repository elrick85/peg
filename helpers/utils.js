module.exports = (function() {
	return {
		decimalFromHex: function(hex){
			return parseInt(hex, 16);
		},
		
		hexFromDecimal: function(decimal){
			return "0x" + decimal.toString(16).toUpperCase();
		},
		
		rand: function(min, max){
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	};	
})();