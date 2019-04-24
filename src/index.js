'use strict';
/* eslint-disable no-unused-vars */
var $ = window.$ = window.jQuery = require('jquery');
var _ = window._ = require('lodash');
var marked = window.marked = require('marked');
var Story = window.Story = require('./story');
var Passage = window.Passage = require('./passage');
/* eslint-enable no-unused-vars */

$(function() {
	window.story = new Story($('tw-storydata'));
	window.story.start($('#main'));
});
