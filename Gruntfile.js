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
				options: {
					output: "source"
				}
			}
		},
		watch: {
			app: {
				files: ["source/parser.peg", "tests/**/*.js", "helpers/**/*.js"],
				tasks: ['peg', 'mochaTest'],
			}
		}
	});

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-peg');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['peg', 'mochaTest', 'watch']);
};