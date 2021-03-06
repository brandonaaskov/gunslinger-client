(function() {
  "use strict";
  module.exports = function(grunt) {
    grunt.initConfig({
      watch: {
        options: {
          debounceDelay: 500
        },
        tools: {
          files: ['*.coffee', '*.json'],
          tasks: ['default']
        },
        application: {
          files: ['scripts/**/*.coffee', 'vendor/**/*.coffee'],
          tasks: ['default']
        },
        tests: {
          files: ['tests/**/*.coffee'],
          tasks: ['default']
        }
      },
      coffee: {
        tools: {
          expand: true,
          cwd: './',
          src: ['**.coffee'],
          dest: '',
          ext: '.js'
        },
        tests: {
          expand: true,
          cwd: 'tests',
          src: ['**/*.coffee'],
          dest: 'tests',
          ext: '.js'
        },
        application: {
          expand: true,
          cwd: 'scripts',
          src: ['**/*.coffee'],
          dest: 'scripts',
          ext: '.js'
        },
        vendor: {
          expand: true,
          cwd: 'vendor',
          src: ['**/*.coffee'],
          dest: 'vendor',
          ext: '.js'
        }
      },
      sass: {
        files: {
          expand: true,
          cwd: 'styles',
          src: ['*.scss'],
          dest: 'styles',
          ext: '.css'
        }
      },
      shell: {
        clientTest: {
          options: {
            stdout: true
          },
          command: 'npm test'
        }
      }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-shell');
    grunt.registerTask('build', ['coffee', 'sass']);
    grunt.registerTask('test', ['shell:clientTest']);
    return grunt.registerTask('default', ['build', 'test']);
  };

}).call(this);
