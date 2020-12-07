import React from 'react';
import './background.less';
import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class background extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		//script
	}

	componentDidMount() {
		$(this.refs.main).waitForImages({
			finished: () => this.props.loaded(),
			each: (e) => {},
			waitForAll: true,
		});
	}

	show() {
		this.refs.main.style.display = 'block';
	}

	hide() {
		this.refs.main.style.display = 'none';
	}

	render() {
		return <div ref='main' id='background'></div>;
	}
}
