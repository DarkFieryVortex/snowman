'use strict';
/* eslint-disable no-unused-vars */
const $ = window.$ = window.jQuery = require('jquery');
const _ = window._ = require('lodash');
const Story = window.Story = require('./story');
const Passage = window.Passage = require('./passage');
const Game = window.Game = require('./game');
/* eslint-enable no-unused-vars */

$(function() {
	const story = $('tw-storydata');
	const main = $('#main');
	window.story = new Story(story);
	window.story.start(main);

	main.on('click', 'a[data-look-action]', (evt) => {
		const $ele = $(evt.currentTarget);
		const target = $ele.attr('data-look-action');
console.log($ele);
console.log(target);
		$('div[data-look-target="'+target+'"]').show();
	});
});
