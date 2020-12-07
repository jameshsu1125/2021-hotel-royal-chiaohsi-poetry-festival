import React from 'react';
import './background.less';

export default class background extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		//script
	}

	componentDidMount() {
		//script
	}

	componentDidUpdate() {
		//script
	}

	componentWillUnmount() {
		//script
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
