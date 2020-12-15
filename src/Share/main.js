import React from 'react';
import './../Index/main.less';

import { Hash } from 'lesca';

export default class share extends React.Component {
	constructor(props) {
		super(props);

		let index = Hash.file().split('_')[1].split('.')[0];
		window.location.replace(`./../?id=${index}`);
	}

	render() {
		return <div></div>;
	}
}
