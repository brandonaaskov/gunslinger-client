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

      tests:
        files: ['client/tests/**/*.coffee', 'server/tests/**/*.coffee']

      styles:
        files: ['client/styles/**/*.scss']

      views:
        files: ['client/views/**/*.html']

    coffee:
      tools:
        files:
          'karma.conf.js': 'karma.conf.coffee'
          'protractor.js': 'protractor.coffee'

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

    shell:
      clientTest:
        options:
          stdout: true
        command: 'npm test'

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-shell'
  grunt.registerTask 'build', ['coffee', 'sass']
  grunt.registerTask 'test', ['shell:clientTest']
  grunt.registerTask 'default', ['build', 'test']