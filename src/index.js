'use strict';

/* eslint-disable no-unused-vars */
const $ = window.$ = window.jQuery = require('jquery');
const _ = window._ = require('lodash');
const Story = window.Story = require('./story');
const Passage = window.Passage = require('./passage');
const Game = window.Game = require('./game');

const { createStore } = require('redux');
const reducer = require('./reducer/test');
const store = createStore(reducer, { }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable no-unused-vars */

$(function() {
	const story = $('tw-storydata');
	const main = $('#main');
	const action = $('#action');
	window.story = new Story(story);
	window.story.start(main);
	
	store.subscribe(() => console.log(store.getState()));
	store.dispatch({
		type: 'SHOW_ACTION_RESULT',
		result: { whee: 'test' }
	});

	main.on('click', 'a[data-look-action]', (evt) => {
		const $ele = $(evt.currentTarget);
		const target = $ele.attr('data-look-action');
		const result = $('#main div[data-look-target="'+target+'"]').clone();
		result.addClass('result');
		result.appendTo(action).show();
	});
});
