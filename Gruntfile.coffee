"use strict"
module.exports = (grunt) ->
  grunt.initConfig
    watch:
      options:
        debounceDelay: 500

      tools:
        files: [
          '*.coffee',
          '*.json'
        ]
        tasks: ['test']

      scripts:
        files: ['client/**/*.coffee', 'server/**/*.coffee']
        tasks: ['test']

      tests:
        files: ['client/tests/**/*.coffee', 'server/tests/**/*.coffee']
        tasks: ['test']

      styles:
        files: ['client/styles/**/*.scss']
        tasks: ['test']

      views:
        files: ['client/views/**/*.html']
        tasks: ['test']

    coffee:
      tools:
        files:
          'client/karma.js': 'client/karma.coffee'
          'client/protractor.js': 'client/protractor.coffee'

      clientTests:
        expand: true
        cwd: 'client/tests'
        src: ['**/*.coffee']
        dest: 'client/tests'
        ext: '.js'

      serverTests:
        expand: true
        cwd: 'server/tests'
        src: ['**/*.coffee']
        dest: 'server/tests'
        ext: '.js'

      client:
        expand: true
        cwd: 'client/scripts'
        src: ['**/*.coffee']
        dest: 'client/scripts'
        ext: '.js'

      server:
        files:
          'server/app.js': 'server/app.coffee'
        expand: true
        cwd: 'server/routes'
        src: ['*.coffee']
        dest: 'server/routes'
        ext: '.js'

    sass:
      files:
        expand: true
        cwd: 'client/styles'
        src: ['*.scss']
        dest: 'client/styles'
        ext: '.css'

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.registerTask 'build', ['coffee', 'sass']
  grunt.registerTask 'default', ['build']