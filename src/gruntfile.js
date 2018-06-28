module.exports = function(grunt) {
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-compass");
	/*grunt.loadNpmTasks('grunt-wiredep');*/
	grunt.initConfig({
		uglify: {
			my_target: {
				files: [{
					expand: true,
					cwd: 'app/js',
					src: '*.js',
					dest: '../js'
				}] //files
			} //my_target
		}, //uglify
		compass: {
			dev: {
				options: {
					require: ['compass'],
					config: 'config.rb'
				} //options
			} //dev
		}, //compass
		/*
		wiredep: {
			task: {
				// Point to the files that should be updated when you run `grunt wiredep`
				src: [
					'application/views/_head.php', // .html support...
					'app/sass/global.scss' // .scss & .sass support...
				],
				options: {
					ignorePath: "../../"
					// See wiredep's configuration documentation for the options you may pass:
					// https://github.com/taptapship/wiredep#configuration
				}
			}
		}, //wiredep
		*/
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['app/js/*.js'],
				tasks: ["uglify"]
			}, //scripts
			sass: {
				files: ["app/sass/*/_*.scss", "app/sass/main.scss"],
				tasks: ["compass:dev"]
			}, //sass
			html: {
				files: ['*.php', '*/*.php']
			} //html
		} //watch
	}); //initConfig
	grunt.registerTask('default', 'watch');
} //exports
