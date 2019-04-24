// Includes
const cpx = require('cpx');
const ejs = require('ejs');
const exec = require('child-process-promise').exec;
const fs = require('fs');
const mkdirp = require('mkdirp');
const pkg = require('../package.json');

// Constants
const encoding = { encoding: 'utf8' };

// Config
const config = require('./' + (process.env.CONFIG_BUILD || 'build-config-release.json'));

const buildSteps = [ exec('cssnano src/*.css') ];
if(config.minifyJs) {
	buildSteps.push(exec('browserify -g uglifyify src/index.js', { maxBuffer: Infinity }));
} else {
	buildSteps.push(exec('browserify src/index.js', { maxBuffer: Infinity }));
}

Promise.all(buildSteps).then(function(results) {
	const distPath = 'dist/' + pkg.name.toLowerCase() + '-' + pkg.version;
	const htmlTemplate = ejs.compile(fs.readFileSync('src/index.ejs', encoding));
	const formatData = {
		author: pkg.author.replace(/ <.*>/, ''),
		description: pkg.description,
		image: 'icon.svg',
		name: pkg.name,
		proofing: false,
		source: htmlTemplate({
			style: results[0].stdout,
			script: results[1].stdout
		}),
		url: pkg.repository,
		version: pkg.version
	};

	mkdirp.sync(distPath);
	fs.writeFileSync(
		distPath + '/format.js',
		'window.storyFormat(' + JSON.stringify(formatData) + ');'
	);
	cpx.copySync('src/icon.svg', distPath);
});