/**
 * Created by mrDima on 12.09.2015.
 */
module.exports = function(grunt) {
    //require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks


    grunt.initConfig({
        uglify: {
            dev: {
                files: {
                    'angular/dev/app.min.js': ['public/js/app.js']
                }
            }
        },
        concat: {
            dist: {
                src: ['public/vendor/ui-router.js','angular/modules/*.js','angular/factory/*.js','angular/ctrls/*.js','angular/directs/*.js'],
                dest: 'public/js/app.js'
            }
        },
        sass: {
            dev: {
                src: 'public/scss/sourse.scss',
                dest: 'public/css/style.css'
            }
        },
        watch: {
            sass: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['public/scss/sourse.scss'],
                tasks: ['sass']
            }

        }
    });


    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['sass', 'watch', 'concat','uglify']);
};
