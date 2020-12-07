import React from 'react';
import './main.less';
import './headline.less';

import Headline from './headline';
import Article from './../Article/main';

import Data from './data';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class poetry extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.state = { article: Data[this.props.index] };
		this.tr = {
			init() {
				this.bg.init();
			},
			in(quickFadein) {
				this.bg.in(quickFadein);
			},
			bg: {
				o: 0,
				time: 2000,
				init() {
					this.c = $(root.refs.bg);
					this.tran();
				},
				in(quickFadein) {
					let t = this.time;
					if (quickFadein) t = 1;

					$(this).animate(
						{ o: 1 },
						{
							duration: t,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'swing',
						}
					);
				},
				blur() {
					this.c.addClass('blur');
				},
				tran() {
					this.c.css('opacity', this.o);
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	in(quickFadein) {
		$('html, body').scrollTop(0);
		this.refs.main.style.display = 'block';
		this.refs.headline.in();

		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(quickFadein),
			each: (e) => {},
			waitForAll: true,
		});
	}

	update_uPy(dy) {
		if (this.state.article) this.refs.headline.update_uPy(dy);
	}

	tween_uPy() {
		if (this.state.article) this.refs.headline.tween_uPy();
	}

	scrollUp() {
		this.refs.headline.scrollUp();
		this.refs.article.scrollUp();
		this.tr.bg.blur();
	}

	append_poetry() {
		if (this.state.article) return <Headline ref='headline' canvas={this.props.canvas} data={this.state.article} index={this.props.index} />;
	}

	append_article() {
		if (this.state.article) return <Article ref='article' data={this.state.article} index={this.props.index} />;
	}

	append_background() {
		return <div ref='bg' className={'bg_' + this.props.index}></div>;
	}

	render() {
		return (
			<div ref='main' id='poetry'>
				{this.append_background()}
				{this.append_poetry()}
				{this.append_article()}
			</div>
		);
	}
}
