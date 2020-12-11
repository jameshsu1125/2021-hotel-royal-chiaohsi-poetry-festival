import React from 'react';
import './background.less';
import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import Odd from './odd_background';
import Even from './odd_background';

export default class background extends React.Component {
	constructor(props) {
		super(props);
		this.state = { home: true, odd: false, even: false };
		this.index = 0;
	}

	componentDidMount() {
		$(this.refs.main).waitForImages({
			finished: () => this.props.loaded(),
			each: (e) => {},
			waitForAll: true,
		});
	}

	blur() {
		let t = $(this.refs.all);
		t.append(this.html_blur(this.index));
		setTimeout(() => {
			if (t.children('div').length > 1) $(t.children('div')[0]).remove();
			else this.setState({ home: false });
		}, 2000);
	}

	in(v) {
		this.index = v;
		let t = $(this.refs.all);
		t.append(this.html(v));
		setTimeout(() => {
			if (t.children('div').length > 1) $(t.children('div')[0]).remove();
			else this.setState({ home: false });
		}, 2000);
	}

	html_blur(v) {
		return `<div class=${'bg_' + v + '_blur'}></div>`;
	}

	html(v) {
		return `<div class=${'bg_' + v}></div>`;
	}

	append_home() {
		if (this.state.home) return <div className='home'></div>;
	}

	render() {
		return (
			<div ref='main' id='background'>
				{this.append_home()}
				<div ref='all' className='all-bg'></div>
			</div>
		);
	}
}
