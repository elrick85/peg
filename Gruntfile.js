module.exports = function (grunt) {
	grunt.initConfig({
		mochaTest: {
		  test: {
			src: ['tests/**/*.js'],
			options: {
			  reporter: 'spec',
			  require: "./helpers/chai.js"
			},
		  },
		},
		peg: {
			example: {
				src: "source/parser.peg",
				dest: "build/parser.js",
				//options: { exportVar: "source/example.parser" }
			}
		},
		watch: {
			app: {
				files: ["source/parser.peg", 'tests/**/*.js'],
				tasks: ['peg', 'mochaTest'],
			}
		}
	});

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-peg');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['peg', 'mochaTest', 'watch']);
};