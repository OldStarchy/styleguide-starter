const gulp = require('gulp');
const sass = require('gulp-sass');
const kss = require('kss');
const fs = require('fs');
const del = require('del');
const browserSync = require('browser-sync');
const sourceMaps = require('gulp-sourcemaps');
const path = require('path');

const scssRoot = 'scss';
const styleguideDest = 'styleguide';
const styleguideCss = styleguideDest + '/css';
const builderRoot = 'builder';

//Use kss:watch and builder:sass:watch

gulp.task('sass:build', () => {
	console.log('Building SCSS files...');
	return gulp
		.src(scssRoot + '/**.scss')
		.pipe(sourceMaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(
			sourceMaps.write('.', {
				sourceRoot: path.relative(styleguideCss, scssRoot),
				includeContent: false,
			})
		)
		.pipe(gulp.dest(styleguideCss));
});

gulp.task('sass:watch', () => {
	console.log('Watching SCSS files...');
	return gulp.watch(scssRoot + '/**/*.scss', ['sass:build']);
});

gulp.task('builder:sass:build', () => {
	console.log('Building SCSS files...');
	return gulp
		.src(builderRoot + '/scss/**.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest(builderRoot + '/kss-assets'));
});

gulp.task('builder:sass:watch', () => {
	console.log('Watching SCSS files...');
	return gulp.watch(builderRoot + '/scss/**.scss', ['builder:sass:build']);
});

gulp.task('kss:clean', () => {
	return del(styleguideDest + '/*');
});

gulp.task('kss:styleguide', () => {
	return kss({
		source: scssRoot,
		css: fs.existsSync('include.txt')
			? fs
					.readFileSync('include.txt')
					.toString()
					.split('\n')
					.filter(file => !file.startsWith('#') && file.trim() !== '')
					.map(file => 'css/' + file)
			: fs
					.readdirSync(scssRoot)
					.filter(
						file => file.endsWith('.scss') && !file.startsWith('_')
					)
					.map(
						file =>
							'css/' + file.substr(0, file.length - 5) + '.css'
					),
		builder: builderRoot,
	});
});

gulp.task('kss:watch', () => {
	const watch = [
		scssRoot + '/**/*.scss',
		scssRoot + '/**/*.md',
		scssRoot + '/**/*.html',
		builderRoot + '/kss-assets/**.*',
		builderRoot + '/index.hbs',
	];
	gulp.watch(watch, ['kss:build']);

	browserSync.create().init(
		{
			files: watch,
			server: {
				baseDir: '.',
			},
			open: 'external',
			online: false,
			reloadOnRestart: true,
		},
		(err, bs) => {
			bs.addMiddleware('*', (req, res) => {
				res.writeHead(302, {
					location: '/styleguide',
				});
				res.end();
			});
		}
	);
});
