import React from 'react';
import './main.less';
import './headline.less';

import Headline from './headline';
import Article from './../Article/main';

import Data from './data';

import $ from 'jquery';
require('jquery-easing');

export default class poetry extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.state = { article: Data[this.props.index] };
		this.tr = {
			init() {
				this.bg.init();
			},
			in() {
				this.bg.in();
			},
			bg: {
				o: 0,
				time: 1000,
				init() {
					this.c = $(root.refs.bg);
					this.tran();
				},
				in() {
					$(this).animate(
						{ o: 1 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeOutQuart',
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

	in() {
		$('html, body').scrollTop(0);
		this.refs.main.style.display = 'block';
		this.refs.headline.in();
		this.tr.in();
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
