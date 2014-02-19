"use strict"
module.exports = (grunt) ->
  grunt.initConfig
    watch:
      options:
        debounceDelay: 500

      tools:
        files: ['*.coffee', '*.json']
        tasks: ['test']

      application:
        files: ['scripts/**/*.coffee', 'vendor/**/*.coffee']

      tests:
        files: ['tests/**/*.coffee']

    coffee:
      tools:
        expand: true
        cwd: './'
        src: ['**.coffee']
        dest: ''
        ext: '.js'

      tests:
        expand: true
        cwd: 'tests'
        src: ['**/*.coffee']
        dest: 'tests'
        ext: '.js'

      application:
        expand: true
        cwd: 'scripts'
        src: ['**/*.coffee']
        dest: 'scripts'
        ext: '.js'
        
      vendor:
        expand: true
        cwd: 'vendor'
        src: ['**/*.coffee']
        dest: 'vendor'
        ext: '.js'

    sass:
      files:
        expand: true
        cwd: 'styles'
        src: ['*.scss']
        dest: 'styles'
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