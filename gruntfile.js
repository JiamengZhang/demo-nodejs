module.exports = function(grunt){

	grunt.initConfig({
		watch: {
			jade:{
				files: ['views/**'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					args: [],
					ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
					watchedExtensions: ['js'],
					watchedFolders: ['app', 'config'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');//监听文件增删改，重新执行任务
	grunt.loadNpmTasks('grunt-nodemon');//监听入口文件
	grunt.loadNpmTasks('grunt-concurrent');//针对慢任务SASS、LESS
	grunt.option('force', true);//防止因为语法等错误中断整个服务
	grunt.registerTask('default', ['concurrent']);
}