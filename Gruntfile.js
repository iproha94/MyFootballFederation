module.exports = function (grunt) {
    grunt.initConfig({
        shell: {
            server: {
                command: 'node app.js'
            },
            webpack: {
                command: 'webpack'
            }
        },
        watch: {
            static: {
                files: [
                    'public/js/**/*.js'
                ],
                tasks: ['shell:webpack'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            options: {
                "esversion": 6,
                "node":true
            },
            app: ['app.js', 'routes/**/*.js', 'models/**/*.js', 'lib/**/*.js'],
            qa: ['Gruntfile.js']
        },
        sass: {
            dist: {
                files: {
                    'public/css/materialize.css': 'public/sass/materialize.scss'
                }
            }
        },
        concurrent: {
            target: [
                'jshint',
                'shell',
                'watch'
            ],
            options: {
                logConcurrentOutput: true /* Вывод процесса */
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', ['concurrent']);
};