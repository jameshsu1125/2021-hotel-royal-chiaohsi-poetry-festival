import React from 'react';
import './main.less';
import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import { Loader } from './../Component/config';

export default class loading extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.bar.init();
				this.logo.init();
				Loader.end = () => {
					setTimeout(() => {
						this.out();
					}, this.bar.time);
				};
			},
			out() {
				this.logo.out();
			},
			in() {
				this.logo.in();
			},
			logo: {
				o: 0,
				s: 1.2,
				time: 1200,
				init() {
					this.c = $(root.refs.logo);
					this.tran();
				},
				out() {
					$(this).animate(
						{ o: 0, s: 0.9 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								root.props.finished();
							},
							easing: 'easeOutQuart',
						}
					);
				},
				in() {
					$(this).animate(
						{ o: 1, s: 1 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								root.props.ready();
							},
							easing: 'easeOutQuart',
						}
					);
				},
				tran() {
					this.c.css({
						transform: `scale(${this.s})`,
						'-webkit-transform': `scale(${this.s})`,
						'-moz-transform': `scale(${this.s})`,
						'-o-transform': `scale(${this.s})`,
						'-ms-transform': `scale(${this.s})`,
						opacity: this.o,
					});
				},
			},
			bar: {
				p: 0,
				time: 2000,
				init() {
					this.c = $(root.refs.bar);
					this.tran();
				},
				set(v) {
					$(this).clearQueue();
					$(this).stop();
					$(this).animate(
						{ p: v },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeOutQuart',
						}
					);
				},
				tran() {
					this.c.css({
						height: this.p + '%',
					});
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(),
			waitForAll: true,
		});
	}

	update() {
		let p = Loader.add();
		this.tr.bar.set(p);
	}

	render() {
		return (
			<div ref='main' id='loading'>
				<div ref='logo' className='logo'>
					<div></div>
					<div ref='bar'></div>
				</div>
			</div>
		);
	}
}
