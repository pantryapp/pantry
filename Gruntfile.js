module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist:{
                src: [
                    'app/js/libs/*.js',
                    'app/js/*.js'
                ],
                dest: 'app/js/build/pantry.js'
            }
        },
        
        bower_concat: {
            all:{
                dest: 'app/js/build/_bower.js'
            }
        },

        uglify: {
            min: {
                files: grunt.file.expandMapping(['app/js/build/pantry.js', 'app/js/build/_bower.js'], '', {
                    rename: function(destBase, destPath) {
                        return destBase+destPath.replace('.js', '.min.js');
                    }
                })
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'app/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'app/img/build/'
                }]
            }
        },

        watch: {
            options:{
                livereload:true
            },
            scripts: {
                files: ['app/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css:{
                files:['app/css/*.scss'],
                tasks:['sass'],
                options:{
                    spawn:false
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'app/css/app.css': 'app/css/app.scss'
                }
            } 
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['concat', 'bower_concat', 'uglify', 'imagemin', 'watch']);

};