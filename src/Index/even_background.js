import React from 'react';
import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class event extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			o: 0,
			time: 1000,
			init() {
				this.c = $(root.refs.main);
				this.c.css('z-index', root.props.zIndex);
				this.tran();
			},
			in() {
				$(this).animate(
					{ o: 1 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
						},
						easing: 'linear',
					}
				);
			},
			out() {
				$(this).animate(
					{ o: 0 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							root.props.distory();
						},
						easing: 'linear',
					}
				);
			},
			tran() {
				this.c.css('opacity', this.o);
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	componentDidUpdate() {
		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(),
			each: (e) => {},
			waitForAll: true,
		});
	}

	out() {
		this.tr.out();
	}

	render() {
		return <div ref='main' className={'bg_' + this.props.index + ' ' + this.props.name}></div>;
	}
}
