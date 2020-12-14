import React from 'react';
import './main.less';

import { UserAgent, Hash, Http2Https, Gtag } from 'lesca';
import Qr from 'lesca/lib/Qrcode';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class main extends React.Component {
	constructor(props) {
		super(props);

		const root = this;

		if (UserAgent.get() === 'mobile') window.location.replace(Hash.root());
		Http2Https.go();
		Gtag.install('UA-20404972-1');

		this.tr = {
			init() {
				this.bg.init();
				this.logo.init();
				this.slogn.init();
				this.cell.init();
				this.txt.init();
				this.qr.init();
			},
			in() {
				this.bg.in();
				this.logo.in();
				this.slogn.in();
				this.cell.in();
				this.txt.in();
				this.qr.in();
			},
			bg: {
				o: 0,
				delay: 0,
				time: 500,
				init() {
					this.c = $(root.refs.bg);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
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
						opacity: this.o,
					});
				},
			},
			logo: {
				o: 0,
				delay: 0,
				time: 1500,
				init() {
					this.c = $(root.refs.logo);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
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
						opacity: this.o,
					});
				},
			},
			slogn: {
				o: 0,
				delay: 100,
				time: 1500,
				init() {
					this.c = $(root.refs.slogn);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
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
						opacity: this.o,
					});
				},
			},
			cell: {
				o: 0,
				s: 1.5,
				r: 0,
				delay: 500,
				time: 1000,
				init() {
					this.c = $(root.refs.cell);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, s: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutExpo',
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
			txt: {
				o: 0,
				s: 1.2,
				r: 0,
				delay: 600,
				time: 1000,
				init() {
					this.c = $(root.refs.txt);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, s: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutExpo',
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
			qr: {
				o: 0,
				s: 1.5,
				r: 0,
				delay: 1000,
				time: 1000,
				init() {
					this.c = $(root.refs.qr);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, s: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutExpo',
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
			finished: () => this.tr.in(),
			each: (e) => {},
			waitForAll: true,
		});

		Gtag.pv('桌機版');
	}

	render() {
		return (
			<div ref='main' id='desktop'>
				<div ref='bg' className='background'></div>
				<div ref='logo' className='logo'></div>
				<div ref='slogn' className='slogn'></div>
				<div className='center'>
					<div ref='cell' className='cell'></div>
					<div ref='txt' className='cell-des'></div>
					<div ref='qr' className='qr'>
						<Qr url={Hash.root()} />
					</div>
				</div>
			</div>
		);
	}
}
