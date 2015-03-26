### -------------------------------------------------------- ###
### ----------------------- VARIABLES ---------------------- ###
### -------------------------------------------------------- ###

# Choose your environment ['rails', 'html', 'symfony', 'angular']
env = 'angular'

# Your CSS and JS files
files =
  cssvendor: [
    # CSS files from components and plugins
    #'<%= paths.bower %>/example/BOWER_EXAMPLE.css'
  ]
  jshead: [
    # JS files you want in the <head>
    '<%= paths.bower %>/modernizr/modernizr.js'
  ]
  jsvendor: [
    # JS plugins you want in body but don't want to be uglified
    '<%= paths.bower %>/jquery/dist/jquery.min.js'
    '<%= paths.bower %>/angular/angular.min.js'
    '<%= paths.bower %>/angular-route/angular-route.min.js'
    '<%= paths.bower %>/angular-resource/angular-resource.min.js'
    '<%= paths.bower %>/angular-touch/angular-touch.min.js'
    '<%= paths.bower %>/angular-animate/angular-animate.min.js'
  ]
  jsbody: [
    # JS Components, plugins + your compiled Coffee
    '<%= paths.js %>/angular/app.js'
    '<%= paths.js %>/angular/**/*.js'
    '<%= paths.tmp %>/App.<%= ext.js %>'
  ]

# Roots depending on the environment
roots =
  rails:   '/app'
  html:    '/dist'
  angular: '/dist'
  symfony: '/web'

# Assets folders
folders =
  assets: '/assets'
  bower:  '/components'
  css:    '/stylesheets'
  images: '/images'
  js:     '/javascripts'
  tmp:    '/.tmp'


### -------------------------------------------------------- ###
### -------------------------- END ------------------------- ###
### -------------------------------------------------------- ###

module.exports = (grunt) ->

  # Load grunt tasks automatically
  require('load-grunt-tasks') grunt

  # Time how long tasks take. Can help when optimizing build times
  require('time-grunt') grunt

  grunt.initConfig

    # Environment
    env: env

    # Paths used in tasks
    paths:
      absRoot:   roots[env]
      root:      ".<%= paths.absRoot %>"
      absAssets: "<%= paths.absRoot %>#{folders.assets}"
      assets:    ".<%= paths.absAssets %>"
      absBower:  "<%= paths.absAssets %>#{folders.bower}"
      bower:     ".<%= paths.absBower %>"
      absCss:    "<%= paths.absAssets %>#{folders.css}"
      css:       ".<%= paths.absCss %>"
      absImages: "<%= paths.absAssets %>#{folders.images}"
      images:    ".<%= paths.absImages %>"
      absJs:     "<%= paths.absAssets %>#{folders.js}"
      js:        ".<%= paths.absJs %>"
      absTmp:    "<%= paths.absAssets %>#{folders.tmp}"
      tmp:       ".<%= paths.absTmp %>"

    # Special extensions used depending on the framework
    ext:
      railsCss:   'css.erb'
      angularCss: 'css'
      htmlCss:    'css'
      symfonyCss: 'css'
      css:        '<%= ext[env + "Css"] %>'
      railsJs:    'js.erb'
      angularJs:  'js'
      htmlJs:     'js'
      symfonyJs:  'js'
      js:         '<%= ext[env + "Js"] %>'



    ### TASKS ###


    # Add vendor prefixed styles
    autoprefixer:
      options:
        browsers: ['last 2 versions', 'ie >= 9', 'Android >= 2']
      dist:
        files: [
          expand: true
          src:    '<%= paths.css %>/global-compiled.<%= ext.css %>'
        ]

    # Concatenate the Bower CSS with the SASS output
    concat_css:
      dist:
        options:
          assetBaseUrl: '<%= paths.absBower %>'
          baseDir: '<%= paths.bower %>/'
        files:
          '<%= paths.css %>/vendors/_vendors.scss': files.cssvendor

    # Run tasks simultaneously to save some time!
    concurrent:
      compile: ['css', 'js']

    # The actual grunt server settings
    connect:
      serve:
        options:
          port:       9000
          hostname:   '0.0.0.0'
          livereload: 35729
          open:       false
          base:       '<%= paths.root %>/'


    # Compress images
    imagemin:
      dist:
        files: [
          expand: true
          cwd:    '<%= paths.images %>/'
          src:    ['**/*.{png,jpg,gif,svg}']
          dest:   '<%= paths.images %>/'
        ]

    # Add the Angular annotations and injections needed to be minified
    ngAnnotate:
      dist:
        files:
          '<%= paths.tmp %>/annotated.<%= ext.js %>': files.jsbody

    # Annoy you with js specification. Still, useful for debuging
    jshint:
      all: ['<%= paths.js %>/angular/**/*.js']

    # Compiles Sass to CSS and generates necessary files if requested
    sass:
      options:
        cacheLocation: '<%= paths.css %>/.sass-cache'
      compile:
        files:
          '<%= paths.css %>/global-compiled.<%= ext.css %>': '<%= paths.css %>/global.sass'

    # Combine and compress files
    uglify:
      angular:
        files:
          '<%= paths.js %>/globalhead.js': files.jshead
          '<%= paths.tmp %>/annotated.<%= ext.js %>': ['<%= paths.tmp %>/annotated.<%= ext.js %>']

    # Concat js vendors with your app
    concat:
      dist:
        files:
          '<%= paths.js %>/global.<%= ext.js %>': [files.jsvendor, '<%= paths.tmp %>/annotated.<%= ext.js %>']

    # Watches files for changes and runs tasks based on the changed files
    watch:
      options:
        livereload: '<%= connect.serve.options.livereload %>'
      html:
        files: ['**/*.{html,html.erb,twig}']
      css:
        options:
          livereload: false
        files: ['<%= paths.css %>/**/*.{scss,sass}']
        tasks: ['sass', 'autoprefixer']
      js:
        files: ['<%= paths.js %>/**/*.coffee', '<%= paths.js %>/angular/**/*.js']
        tasks: ['js']
      livereload:
        files: ['<%= paths.css %>/**/*.<%= ext.css %>']

  grunt.registerTask 'default', [
    'dev'
  ]

  grunt.registerTask 'images', [
    'imagemin'
  ]

  # Used by concurrent
  grunt.registerTask 'css', [
    'concat_css'
    'sass'
    'autoprefixer'
  ]

  # Used by concurrent
  grunt.registerTask 'js', 'Javascript related tasks', ->
    if env == 'angular'
      grunt.task.run ['jshint','ngAnnotate','uglify:angular','concat']
    else
      grunt.task.run ['uglify:dist']

    true

  # Used by dev
  grunt.registerTask 'compileServe', [
    'bowerrc'
    'concurrent:compile'
    'connect:serve'
    'watch'
  ]

  # Used by dev
  grunt.registerTask 'compileWatch', [
    'bowerrc'
    'concurrent:compile'
    'watch'
  ]


  grunt.task.registerTask 'dev', 'Tasks running when developing', ->
    if env != ''
      switch env
        when 'rails'
          grunt.log.subhead ':::: Don\'t forget to run your \'bundle exec rails s\' task ::::'
          grunt.task.run    'compileWatch'
        when 'symfony'
          grunt.log.subhead ':::: Don\'t forget to run your \'app/console server run\' task ::::'
          grunt.task.run    'compileWatch'
        when 'html', 'angular'
          grunt.task.run    'compileServe'
        else
          grunt.log.error 'You picked a wrong environment! Choose: [\'html\', \'rails\', \'symfony\', \'angular\']'

    else
      grunt.log.error 'Pick an environment, please. [\'html\', \'rails\', \'symfony\', \'angular\']'


  grunt.task.registerTask 'bowerrc', 'Update .bowerrc file if necessary', ->
    bowerrc = './.bowerrc'

    if grunt.file.exists bowerrc
      rcfile    = grunt.file.readJSON bowerrc
      targetDir = roots[env].substr(1) + folders.assets + folders.bower

      if rcfile.directory != targetDir
        rcfile.directory = targetDir
        grunt.file.write bowerrc, JSON.stringify(rcfile, null, 2)
        grunt.log.ok '.bowerrc file updated with new directory path'
      else
        grunt.log.ok()

    else
      rcfile =
        directory: roots[env].substr(1) + folders.assets + folders.bower

      grunt.file.write bowerrc, JSON.stringify(rcfile, null, 2)
      grunt.log.ok '.bowerrc file created'

    true
