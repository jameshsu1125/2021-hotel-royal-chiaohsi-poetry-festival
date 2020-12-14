import React from 'react';

import $ from 'jquery';
require('jquery-easing');

import { LocalStorage, Gtag } from 'lesca';
import Data from './../../Poetry/data';

export default class row extends React.Component {
	constructor(props) {
		super(props);
		const root = this;

		this.data = [...Data, { title: '關於道別' }, { title: '到老爺看完整詩展' }];

		this.tr = {
			init() {
				this.bg.init();
				this.txt.init();
				return this;
			},
			in() {
				this.bg.in();
				this.txt.in();
			},
			bg: {
				t: -100,
				time: 1200,
				init() {
					this.c = $(root.refs.bg);
					this.tran();
				},
				in() {
					$(this).animate(
						{ t: 0 },
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
						top: this.t + '%',
					});
				},
			},
			txt: {
				x: 0 - window.innerHeight / 7,
				time: 1000,
				delay: 1200 + root.props.index * 100,
				init() {
					this.c = $(root.refs.txt);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ x: 0 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									this.syncRead();
								},
								easing: 'easeOutQuart',
							}
						);
				},
				tran() {
					this.c.css({
						'background-position-y': `calc(50% - ${this.x}px)`,
					});
				},
				syncRead() {
					if (root.props.index >= 12) return;
					let is = JSON.parse(LocalStorage.get('data'))[root.props.index].readed;
					if (is) {
						let t = $(root.refs.readed);
						t.css('display', 'block');
						t.animate({ opacity: 1 }, 1000, 'easeOutQuart');
					}
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init().in();

		let pxy, mxy;
		TouchEvent.add('.row' + this.props.index, (e) => {
			mxy = pxy = e.targetTouches[0];
		});
		this.refs.main.addEventListener(
			'touchmove',
			(e) => {
				mxy = e.targetTouches[0];
			},
			{ passive: false }
		);
		this.refs.main.addEventListener('touchend', (e) => {
			if (Math.abs(pxy.clientX - mxy.clientX) < 5 && Math.abs(pxy.clientY - mxy.clientY) < 5) {
				Gtag.event('Menu', this.data[this.props.index].title);
				if (fbq) fbq('trackCustom', `row${this.props.index}`, { article: this.data[this.props.index].title });
				let time = 1;
				if (this.props.index == 13) time = 300;
				setTimeout(() => {
					this.props.clicked(this.props.index);
				}, time);
			}
		});
	}

	reset() {
		this.tr.out();
	}

	render() {
		return (
			<div ref='main' className={'row' + this.props.index}>
				<div ref='bg' className='bg'></div>
				<div ref='txt' className='txt'></div>
				<div ref='readed' className='readed'></div>
			</div>
		);
	}
}
