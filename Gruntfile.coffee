### -------------------------------------------------------- ###
### ----------------------- VARIABLES ---------------------- ###
### -------------------------------------------------------- ###

# Choose your environment ['rails', 'html', 'symfony']
env = 'html'

# Your CSS and JS files
files =
  cssvendor: [
    # CSS files from components and plugins
    #'<%= paths.bower %>/example/BOWER_EXAMPLE.css'
  ]
  jshead: [
    # JS files you want in the <head>
    '<%= paths.bower %>/modernizr/modernizr.js'
    '<%= paths.bower %>/respond/dest/respond.min.js'
  ]
  coffees: [
    # Coffee files
    # '<%= paths.js %>/classes/*.coffee'
    '<%= paths.js %>/App.Common.coffee'
    '<%= paths.js %>/App.*.coffee'
  ]
  jsbody: [
    # JS Components, plugins + your compiled Coffee
    '<%= paths.bower %>/Countable/Countable.js'
    '<%= paths.bower %>/fastclick/lib/fastclick.js'
    '<%= paths.js %>/App.<%= ext.js %>'
  ]

# Roots depending on the environment
roots =
  rails:   '/app'
  html:    '/dist'
  symfony: '/web'

# Assets folders
folders =
  assets: '/assets'
  bower:  '/components'
  css:    '/stylesheets'
  images: '/images'
  js:     '/javascripts'


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

    # Special extensions used depending on the framework
    ext:
      railsCss:   'css.erb'
      htmlCss:    'css'
      symfonyCss: 'css'
      css:        '<%= ext[env + "Css"] %>'
      railsJs:    'js.erb'
      htmlJs:     'js'
      symfonyJs:  'js'
      js:         '<%= ext[env + "Js"] %>'



    ### TASKS ###


    # Add vendor prefixed styles
    autoprefixer:
      options:
        browsers: ['last 2 versions', 'ie >= 8', 'Android >= 2']
      dist:
        files: [
          expand: true
          src:    '<%= paths.css %>/global-compiled.<%= ext.css %>'
        ]


    # Compiles Coffeescript to a JS file (that will need to be combined by uglify)
    coffee:
      compile:
        files:
          '<%= paths.js %>/App.<%= ext.js %>': files.coffees


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


    # Compiles Sass to CSS and generates necessary files if requested
    sass:
      options:
        cacheLocation: '<%= paths.css %>/.sass-cache'
      compile:
        files:
          '<%= paths.css %>/global-compiled.<%= ext.css %>': '<%= paths.css %>/global.sass'


    # Combine and compress files
    uglify:
      dist:
        files:
          # Head Scripts
          '<%= paths.js %>/globalhead.js': files.jshead
          '<%= paths.js %>/global.<%= ext.js %>': files.jsbody


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
        files: ['<%= paths.js %>/**/*.coffee']
        tasks: ['coffee', 'uglify']
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
  grunt.registerTask 'js', [
    'coffee'
    'uglify'
  ]

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
        when 'html'
          grunt.task.run    'compileServe'
        else
          grunt.log.error 'You picked a wrong environment! Choose: [\'html\', \'rails\', \'symfony\']'

    else
      grunt.log.error 'Pick an environment, please. [\'html\', \'rails\', \'symfony\']'


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
