import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import { Motion, UserAgent } from 'lesca';

export default class content extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			s: 1,
			o: 1,
			init() {
				this.c = $(root.refs.main);
				this.t0.init();
				this.t1.init();
				this.t2.init();
				this.t3.init();
				this.t4.init();
				this.t5.init();
				this.title1.init();
				this.title2.init();
				this.btn.init();
			},
			in(fn) {
				root.refs.main.style.display = 'block';
				this.t0.in();
				this.t1.in();
				this.t2.in();
				this.t3.in();
				this.t4.in();
				this.t5.in();
				this.title1.in();
				this.title2.in();
				this.btn.in(fn);
			},
			out() {
				TouchEvent.remove('.btn-container');
				root.props.enter();

				$(this)
					.delay(500)
					.animate(
						{ s: 0.8, o: 0 },
						{
							duration: 500,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								root.props.distory();
							},
							easing: 'easeOutQuart',
						}
					);
				this.t0.out();
				this.t1.out();
				this.t2.out();
				this.t3.out();
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
			btn: {
				o: 0,
				delay: { in: 500 + 2000 + 1000 + 1000 + 1000 + 1000 + 2000, out: 0 },
				time: 1000,
				init() {
					this.c = $(root.refs.btn);
					this.tran();
				},
				in(fn) {
					$(this)
						.delay(this.delay.in)
						.animate(
							{ o: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									fn();
									this.evt();
								},
								easing: 'easeOutQuart',
							}
						);
				},
				tran() {
					this.c.css({
						opacity: this.o,
					});
				},
				evt() {
					TouchEvent.add('.btn-container', () => {
						if (UserAgent.get() == 'mobile' && window.location.protocol == 'https') {
							Motion.init({
								callback: (e) => {
									Motion.distory();
									root.tr.out();
								},
							});
						} else {
							root.tr.out();
						}
					});
				},
			},
			title2: {
				o: 0,
				top: 30,
				time: 800,
				delay: { in: 500 + 2000 + 1000 + 1000 + 1000 + 1500, out: 0 },
				init() {
					this.c = $(root.refs.title2);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay.in)
						.animate(
							{ o: 1, top: 15 },
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
						opacity: this.o,
						'margin-top': this.top + 'px',
					});
				},
			},
			title1: {
				o: 0,
				top: 30,
				time: 800,
				delay: { in: 500 + 2000 + 1000 + 1000 + 1000 + 1000, out: 0 },
				init() {
					this.c = $(root.refs.title1);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay.in)
						.animate(
							{ o: 1, top: 0 },
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
						opacity: this.o,
						'margin-top': this.top + 'px',
					});
				},
			},
			t0: {
				o: 0,
				s: 1.2,
				time: 2000,
				delay: { in: 0, out: 0 },
				init() {
					this.c = $(root.refs.t0);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay.in)
						.animate(
							{ o: 1, s: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						);
				},
				out() {
					$(this)
						.delay(this.delay.out)
						.animate(
							{ o: 0, s: 0.9 },
							{
								duration: 500,
								step: () => this.tran(),
								complete: () => this.tran(),
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
			t1: {
				o: 0,
				s: 1.2,
				time: 2000,
				delay: { in: 500, out: 100 },
				init() {
					this.c = $(root.refs.t1);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay.in)
						.animate(
							{ o: 1, s: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						);
				},
				out() {
					$(this)
						.delay(this.delay.out)
						.animate(
							{ o: 0, s: 0.9 },
							{
								duration: 500,
								step: () => this.tran(),
								complete: () => this.tran(),
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
			t2: {
				o: 0,
				s: 1.1,
				time: 2000,
				delay: { in: 500 + 2000, out: 200 },
				init() {
					this.c = $(root.refs.t2);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay.in)
						.animate(
							{ o: 1, s: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						);
				},
				out() {
					$(this)
						.delay(this.delay.out)
						.animate(
							{ o: 0, s: 0.9 },
							{
								duration: 500,
								step: () => this.tran(),
								complete: () => this.tran(),
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
			t3: {
				o: 0,
				s: 1.2,
				time: 5000,
				delay: { in: 500 + 2000 + 1000, out: 300 },
				init() {
					this.c = $(root.refs.t3);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay.in)
						.animate(
							{ o: 1, s: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuad',
							}
						);
				},
				out() {
					$(this)
						.delay(this.delay.out)
						.animate(
							{ o: 0, s: 0.9 },
							{
								duration: 500,
								step: () => this.tran(),
								complete: () => this.tran(),
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
			t4: {
				o: 0,
				s: 1,
				time: 1200,
				delay: { in: 500 + 2000 + 1000 + 1000, out: 400 },
				init() {
					this.c = $(root.refs.t4);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay.in)
						.animate(
							{ o: 1 },
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
						transform: `scale(${this.s})`,
						'-webkit-transform': `scale(${this.s})`,
						'-moz-transform': `scale(${this.s})`,
						'-o-transform': `scale(${this.s})`,
						'-ms-transform': `scale(${this.s})`,
						opacity: this.o,
					});
				},
			},
			t5: {
				o: 0,
				s: 1,
				time: 1200,
				delay: { in: 500 + 2000 + 1000 + 1000 + 500, out: 0 },
				init() {
					this.c = $(root.refs.t5);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay.in)
						.animate(
							{ o: 1 },
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
						transform: `scale(${this.s})`,
						'-webkit-transform': `scale(${this.s})`,
						'-moz-transform': `scale(${this.s})`,
						'-o-transform': `scale(${this.s})`,
						'-ms-transform': `scale(${this.s})`,
						opacity: this.o,
					});
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => {},
			each: (e) => {
				this.props.update();
			},
			waitForAll: true,
		});
	}

	in(fn) {
		this.tr.in(fn);
	}

	out() {
		this.tr.out();
	}

	render() {
		return (
			<div ref='main' id='home'>
				<div className='center'>
					<div ref='logo' className='logo'>
						<div ref='t0'></div>
						<div ref='t1'></div>
						<div ref='t2'></div>
						<div ref='t3'></div>
						<div ref='t4'></div>
						<div ref='t5'></div>
					</div>
					<div className='title'>
						<div ref='title1'></div>
						<div ref='title2'></div>
					</div>
				</div>
				<div className='bottom'>
					<div ref='btn' className='btn-container'>
						<div className='corner'>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<div className='txt'>甩動手機 灑出道別詩作</div>
						<div className='corner'>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
