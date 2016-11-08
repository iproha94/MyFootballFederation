var webpackDevConfig = require('./webpack.config.js');

module.exports = function (grunt) {
    grunt.initConfig({
        shell: {
            server: {
                command: 'nodemon --ignore public/ app.js'
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
        sass: {
            dist: {
                files: {
                    'public/css/materialize.css': 'public/sass/materialize.scss'
                }
            }
        },
        concurrent: {
            target: [
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
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-webpack');


    grunt.registerTask('default', ['concurrent']);
};