/**
 * Created by mrDima on 12.09.2015.
 */
module.exports = function(grunt) {
    //require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks


    grunt.initConfig({
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


    grunt.registerTask('default', ['sass', 'watch']);
};
