import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import { Motion, UserAgent, Gtag } from 'lesca';
import Enter from './enter';
import { Sensor_g } from './../Component/config';

export default class content extends React.Component {
	constructor(props) {
		super(props);
		this.state = { enter: true };
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
				delay: { in: 200 + 500 + 200 + 1000 + 100 + 1000 + 500 + 1000, out: 0 },
				time: 1000,
				init() {
					this.c = $(root.refs.btn);
					this.tran();
				},
				in(fn) {
					if (window.denied) {
						$(root.refs.txt).addClass('by-click');
					}
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
					if (Motion.ready) {
						Motion.addEvent(Sensor_g, (e) => {
							Motion.disable = false;
							root.tr.out();
							Gtag.event('首頁', '甩動手機 灑出道別詩作');
						});
					}
					TouchEvent.add('.btn-container', () => {
						TouchEvent.remove('.btn-container');
						root.tr.out();
						Gtag.event('首頁', '甩動手機 灑出道別詩作');
					});
				},
			},
			title2: {
				o: 0,
				top: 30,
				time: 800,
				delay: { in: 200 + 500 + 200 + 1000 + 100 + 1000 + 500, out: 0 },
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
				delay: { in: 200 + 500 + 200 + 1000 + 100 + 1000, out: 0 },
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
				time: 1000,
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
				time: 1000,
				delay: { in: 200, out: 100 },
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
				time: 1000,
				delay: { in: 200 + 500, out: 200 },
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
				time: 3000,
				delay: { in: 200 + 500 + 200, out: 300 },
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
				time: 1000,
				delay: { in: 200 + 500 + 200 + 1000, out: 400 },
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
				time: 1000,
				delay: { in: 200 + 500 + 200 + 1000 + 100, out: 0 },
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
		this.fn = fn;
		this.refs.main.style.display = 'block';
		if (this.refs.enter) this.refs.enter.in();
		Gtag.pv('介紹頁');
	}

	out() {
		this.tr.out();
	}

	enter_destory() {
		this.setState({ enter: false });
	}

	enter_out() {
		setTimeout(() => {
			this.tr.in(this.fn);
		}, 500);
		Gtag.pv('首頁');
	}

	append_enter() {
		if (this.state.enter) return <Enter ref='enter' out={this.enter_out.bind(this)} destory={this.enter_destory.bind(this)} />;
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
						<div ref='txt' className='txt'></div>
						<div className='corner'>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
				{this.append_enter()}
			</div>
		);
	}
}
