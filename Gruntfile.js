/**
* LF-GREIM specific Grunt config
*/
module.exports = function (grunt) {
  'use strict';

  var templatesDir = 'templates/';


  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration.
	grunt.initConfig({


		// LESS
		less: {
			dist: {
				options: {
					paths: ['less/'],
					cleancss: false
				},
				files: {'templates/css/base.css': 'less/base.less'}
			}
		},


    // UGLIFY
    uglify: {
      options: {
        separator: ';',
        compress: false,
        beautify: true,
        report: false,
        preserveComments: 'all',
      },
      dist: {
        src: ['js/base.js'],
        dest: templatesDir + 'js/base.min.js'
      }
    },


    // CONCAT JS
    concat: {
      options: {
        process: function(src, filepath) {
          return '// ###########################################' + '\n' + '// ################## ' + filepath + '\n' + '// ###########################################'+ '\n' + src + '\n';
        }
      },
      dist: {
        src: ['js/plugins/*.js'],
        dest: templatesDir + 'js/plugins.min.js'
      }
    },


    // COPY
    copy: {
      audiojs: {
        expand: true,
        cwd: 'js/plugins/',
        src: ['*.swf','*.gif'],
        dest: templatesDir +'js/'
      },
      vendorjs: {
        expand: true,
        cwd: 'js/',
        src: ['vendor/*'],
        dest: templatesDir +'js/'
      },
      basejs: {
        expand: true,
        cwd: 'js/',
        src: ['base.js'],
        dest: templatesDir +'js/',
        rename: function(dest, src) {
          return dest + src.replace(/\.js$/, ".min.js");
        }
      }
    },


		// WATCH
		watch: {
			styles: {
				files: 'less/**/*.less',
				tasks: ['less:dist'],
				// options: {
				// 	livereload: true,
				// }
			},
      js: {
        files: 'js/**/*',
        tasks: ['copy:audiojs', 'copy:vendorjs', 'uglify', 'concat:dist'],
      }
		}


	})

	// Import du package
	grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-svgicons2svgfont');

	// INIT
  grunt.registerTask('default', ['watch']);

}
