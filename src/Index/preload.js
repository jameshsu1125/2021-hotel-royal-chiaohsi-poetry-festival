import React from 'react';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class preload extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		//script
	}

	componentDidMount() {
		$(this.refs.main).waitForImages({
			finished: () => {},
			each: (e) => this.props.update(),
			waitForAll: true,
		});
	}

	render() {
		return (
			<div ref='main' id='background'>
				<div className='bg_0'></div>
				<div className='bg_1'></div>
				<div className='bg_2'></div>
				<div className='bg_3'></div>
				<div className='bg_4'></div>
				<div className='bg_5'></div>
				<div className='bg_6'></div>
				<div className='bg_7'></div>
				<div className='bg_8'></div>
				<div className='bg_9'></div>
				<div className='bg_10'></div>
				<div className='bg_11'></div>
				<div className='bg_0_blur'></div>
				<div className='bg_1_blur'></div>
				<div className='bg_2_blur'></div>
				<div className='bg_3_blur'></div>
				<div className='bg_4_blur'></div>
				<div className='bg_5_blur'></div>
				<div className='bg_6_blur'></div>
				<div className='bg_7_blur'></div>
				<div className='bg_8_blur'></div>
				<div className='bg_9_blur'></div>
				<div className='bg_10_blur'></div>
				<div className='bg_11_blur'></div>
			</div>
		);
	}
}
