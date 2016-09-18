module.exports = function (grunt) {
    grunt.initConfig({
        shell: {
            server: {
                command: 'nodemon app.js'
            }
        },
        watch: {
            static: {
                files: [
                    'public/js/**/*.js',
                    'templates/**/*.html'
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

    grunt.registerTask('default', ['concurrent']);
};