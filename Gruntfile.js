var webpackDevConfig = require('./webpack.config.js');

module.exports = function (grunt) {
    grunt.initConfig({
        shell: {
            server: {
                command: 'node app.js'
            }
        },
        watch: {
            static: {
                files: [
                    'public/js/bundle.js'
                ],
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
                'webpack:watch',
                'shell',
                'watch'
            ],
            options: {
                logConcurrentOutput: true /* Вывод процесса */
            }
        },
        webpack: {
            options: webpackDevConfig,
            watch: {
                failOnError: false,
                watch: true,
                keepalive: true
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-webpack');


    grunt.registerTask('default', ['concurrent']);
};