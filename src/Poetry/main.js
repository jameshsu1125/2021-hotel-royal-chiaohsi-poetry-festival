import React from 'react';
import './main.less';
import './headline.less';

import Headline from './headline';
import Article from './../Article/main';

import Data from './data';
import { Gtag } from 'lesca';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class poetry extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.state = { article: Data[this.props.index] };
	}

	componentDidMount() {}

	in() {
		$('html, body').scrollTop(0);
		this.refs.main.style.display = 'block';
		this.refs.headline.in();

		Gtag.pv(`${this.state.article.title}_詩作`);
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
		this.props.bg_blur();
		Gtag.event(`${this.state.article.title}_詩作`, '向上滑');
		//this.tr.bg.blur();
	}

	append_poetry() {
		if (this.state.article) return <Headline ref='headline' canvas={this.props.canvas} data={this.state.article} index={this.props.index} />;
	}

	append_article() {
		if (this.state.article) return <Article next={this.props.next} ref='article' data={this.state.article} index={this.props.index} />;
	}

	append_background() {
		return (
			<>
				<div ref='bg0' className={'bg_' + this.props.index}></div>
				<div ref='bg' className={'bg_' + this.props.index}></div>
			</>
		);
	}

	render() {
		return (
			<div ref='main' id='poetry'>
				{/* {this.append_background()} */}
				{this.append_poetry()}
				{this.append_article()}
			</div>
		);
	}
}
